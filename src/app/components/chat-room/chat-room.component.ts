import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-messages">
      <div *ngFor="let message of messages">
        <p>{{ message.sender }}: {{ message.content }}</p>
        <img *ngIf="message.type === 'image'" [src]="message.imageUrl" alt="Image message">
      </div>
    </div>
    <form (ngSubmit)="sendMessage()">
      <input [(ngModel)]="newMessage" name="newMessage" placeholder="Type a message">
      <input type="file" (change)="onFileSelected($event)" accept="image/*">
      <button type="submit">Send</button>
    </form>
  `
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  newMessage: string = '';
  selectedFile: File | null = null;
  private messageSubscription: Subscription | undefined;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.joinChannel('defaultChannelId');
    this.loadMessages();
    this.messageSubscription = this.chatService.onNewMessage().subscribe(message => {
      this.messages.push(message);
    });
  }

  ngOnDestroy(): void {
    this.chatService.leaveChannel('defaultChannelId');
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  loadMessages(): void {
    this.chatService.getMessages('defaultChannelId').subscribe(
      messages => {
        this.messages = messages;
      },
      error => {
        console.error('Error loading messages', error);
      }
    );
  }

  sendMessage(): void {
    if (this.newMessage.trim() || this.selectedFile) {
      const formData = new FormData();
      formData.append('content', this.newMessage);
      formData.append('channelId', 'defaultChannelId');
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.chatService.uploadImage(formData).subscribe(
        response => {
          this.newMessage = '';
          this.selectedFile = null;
        },
        error => {
          console.error('Error sending message', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }
}
