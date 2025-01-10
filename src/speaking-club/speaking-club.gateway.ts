import { BadGatewayException, UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { UserService } from 'src/user/user.service';
import { SpeakingClubService } from './speaking-club.service';
@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000', 
      'https://cam-english-fe.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST'],
  },
})
export class SpeakingClubGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly userService: UserService,
    private readonly speakingClubService: SpeakingClubService
  ) { }

  /** Handles connection and join socket */
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

      socket.data.user = user;
      socket.data.roomId = roomId;

      socket.join(roomId as string);
    } catch (error) {
      socket.disconnect();
    }
  }

  /** Handles disconnection and performs cleanup */
  handleDisconnect(socket: Socket) {
    const { user, roomId } = socket.data
    socket.to(roomId).emit('disconnected', { user });
  }

  /** Handles emit offer */
  @SubscribeMessage('offer')
  handleOffer(socket: Socket, payload: { offer: RTCSessionDescription }) {
    const roomId = socket.data.roomId
    socket.to(roomId).emit('offer', { offer: payload.offer });
  }

  /** Handles emit answer */
  @SubscribeMessage('answer')
  handleAnswer(socket: Socket, payload: { answer: RTCSessionDescription }) {
    const roomId = socket.data.roomId
    socket.to(roomId).emit('answer', { answer: payload.answer });
  }

  /** Handles emit iceCandidate */
  @SubscribeMessage('iceCandidate')
  handleIceCandidate(socket: Socket, payload: { candidate: RTCIceCandidate }) {
    const roomId = socket.data.roomId
    socket.to(roomId).emit('iceCandidate', { candidate: payload.candidate });
  }
}
