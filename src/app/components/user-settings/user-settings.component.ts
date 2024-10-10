import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <h2>User Settings</h2>
      <input type="file" (change)="onFileSelected($event)" accept="image/*">
      <button (click)="uploadAvatar()">Upload Avatar</button>
    </div>
  `
})
export class UserSettingsComponent {
  selectedFile: File | null = null;

  constructor(private userService: UserService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadAvatar(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('avatar', this.selectedFile, this.selectedFile.name);

      this.userService.updateAvatar(formData).subscribe(
        response => {
          console.log('Avatar updated successfully', response);
        },
        error => {
          console.error('Error updating avatar', error);
        }
      );
    }
  }
}
