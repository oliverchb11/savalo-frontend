import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socketStatus = false;
  private socket: Socket;
  constructor(

  ) { 

    this.socket = io('http://localhost:4000');
  }




}