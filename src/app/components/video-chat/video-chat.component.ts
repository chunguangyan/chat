import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Peer from 'peerjs';

@Component({
  selector: 'app-video-chat',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <video #localVideo autoplay muted></video>
      <video #remoteVideo autoplay></video>
      <input [(ngModel)]="remotePeerId" placeholder="Remote Peer ID">
      <button (click)="connectToPeer()">Connect</button>
    </div>
  `
})
export class VideoChatComponent implements OnInit {
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  peer: Peer;
  localStream: MediaStream | null = null;
  remotePeerId: string = '';

  constructor() {
    this.peer = new Peer( {
      host: '/',
      port: 443,
      path: '/peerjs',
      secure: true
    });
  }

  ngOnInit(): void {
    this.setupPeerEvents();
  }

  setupPeerEvents(): void {
    this.peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
    });

    this.peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((stream) => {
          this.localStream = stream;
          this.localVideo.nativeElement.srcObject = stream;
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            this.remoteVideo.nativeElement.srcObject = remoteStream;
          });
        })
        .catch(err => {
          console.error('Failed to get local stream', err);
        });
    });
  }

  connectToPeer(): void {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then((stream) => {
        this.localStream = stream;
        this.localVideo.nativeElement.srcObject = stream;

        const call = this.peer.call(this.remotePeerId, stream);
        call.on('stream', (remoteStream) => {
          this.remoteVideo.nativeElement.srcObject = remoteStream;
        });
      })
      .catch(err => {
        console.error('Failed to get local stream', err);
      });
  }

  ngOnDestroy(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
    this.peer.destroy();
  }
}
