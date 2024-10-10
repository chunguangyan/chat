import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private apiUrl = `${environment.apiUrl}/messages`;

  constructor(private http: HttpClient) {
    this.socket = io(environment.socketUrl);
  }

  joinChannel(channelId: string): void {
    this.socket.emit('join channel', channelId);
  }

  leaveChannel(channelId: string): void {
    this.socket.emit('leave channel', channelId);
  }

  sendMessage(message: any): void {
    this.socket.emit('chat message', message);
  }

  getMessages(channelId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${channelId}`);
  }

  onNewMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('chat message', (message: Message) => {
        observer.next(message);
      });
    });
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, formData);
  }
}
