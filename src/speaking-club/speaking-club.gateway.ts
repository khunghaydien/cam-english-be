import { BadGatewayException, UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { UserService } from 'src/user/user.service';
import { SpeakingClubService } from './speaking-club.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
  },
})
export class SpeakingClubGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly userService: UserService,
    private readonly speakingClubService: SpeakingClubService
  ) { }

  /** Handles new connections and authenticates the user */
  async handleConnection(socket: Socket) {
    try {
      const cookies = parse(socket.handshake.headers.cookie || '');
      const sessionToken = cookies['next-auth.session-token'];
      const { roomId } = socket.handshake.query || {};

      if (!sessionToken) {
        socket.disconnect();
        throw new UnauthorizedException('No session token provided');
      }

      const user = await this.userService.verifyUser(sessionToken);
      if (!user) {
        socket.disconnect();
        throw new UnauthorizedException('User verification failed');
      }

      const speakingRoom = await this.speakingClubService.getSpeakingRoom({ id: roomId as string });
      if (!speakingRoom) {
        socket.disconnect();
        throw new BadGatewayException('Speaking room not found');
      }
      socket.join(roomId as string);  // User joins the room
      // socket.to(roomId).emit('userJoined', { message: `${user.name} has joined the room!`, user });
    } catch (error) {
      console.error('Error during connection:', error);
      socket.disconnect();
    }
  }

  /** Handles disconnection and performs cleanup */
  handleDisconnect(socket: Socket) {
    // Lấy tất cả các phòng mà socket đã tham gia, loại bỏ phòng mặc định (socket.id)
    const roomIds = Array.from(socket.rooms).filter(roomId => roomId !== socket.id);
    // Gửi thông báo cho các phòng mà socket đã rời khỏi
    roomIds.forEach((roomId) => {
      socket.to(roomId).emit('disconnected', { socketId: socket.id });
    });
  }

  @SubscribeMessage('offer')
  handleOffer(socket: Socket, payload: { offer: RTCSessionDescription, roomId: string }) {
    socket.to(payload.roomId).emit('offer', { offer: payload.offer });
  }

  @SubscribeMessage('answer')
  handleAnswer(socket: Socket, payload: { answer: RTCSessionDescription, roomId: string }) {
    socket.to(payload.roomId).emit('answer', { answer: payload.answer });
  }

  @SubscribeMessage('iceCandidate')
  handleIceCandidate(socket: Socket, payload: { candidate: RTCIceCandidate, roomId: string }) {
    socket.to(payload.roomId).emit('iceCandidate', { candidate: payload.candidate });
  }
}
