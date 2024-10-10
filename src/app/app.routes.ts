import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { VideoChatComponent } from './components/video-chat/video-chat.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', component: ChatRoomComponent },
  { path: 'settings', component: UserSettingsComponent },
  { path: 'video-chat', component: VideoChatComponent },
  { path: '**', redirectTo: '' }
];
