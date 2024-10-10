import { expect } from 'chai';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import * as sinon from 'sinon';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceStub: any;
  let routerStub: any;

  beforeEach(async () => {
    authServiceStub = {
      login: sinon.stub()
    };

    routerStub = {
      navigate: sinon.stub()
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('应该成功登录', () => {
    const mockResponse = { token: 'fake-jwt-token' };
    authServiceStub.login.returns(of(mockResponse));

    component.email = 'test@example.com';
    component.password = 'password123';

    component.onSubmit();

    expect(authServiceStub.login.calledOnce).to.be.true;
    expect(routerStub.navigate.calledOnce).to.be.true;
  });

  it('应该显示登录失败信息', () => {
    authServiceStub.login.returns(throwError(() => new Error('Invalid credentials')));

    component.email = 'wrong@example.com';
    component.password = 'wrongpassword';

    component.onSubmit();

    expect(authServiceStub.login.calledOnce).to.be.true;
    expect(component.errorMessage).to.equal('登录失败，请检查您的凭据并重试。');
    expect(routerStub.navigate.called).to.be.false;
  });
});
