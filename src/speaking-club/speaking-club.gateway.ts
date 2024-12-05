import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
  },
})
export class SpeakingClubGateway implements OnGatewayConnection, OnGatewayDisconnect {

  // When a user connects
  handleConnection(socket: Socket) {
    socket.emit('me', socket.id); // Emit the user's socket ID to them
  }

  // When a user disconnects
  handleDisconnect(socket: Socket) {
    socket.broadcast.emit('callEnded'); // Broadcast 'callEnded' to other connected clients
  }

  @SubscribeMessage('callUser')
  handleCallUser(socket: Socket, payload: { userToCall: string; signalData: any; from: string; name: string }) {
    socket.to(payload.userToCall).emit('callUser', {
      signal: payload.signalData,
      from: payload.from,
      name: payload.name
    })
  }

  @SubscribeMessage('answerCall')
  handleAnswerCall(socket: Socket, data: { to: string; signal: any }) {
    socket.to(data.to).emit("callAccepted", data.signal);
  }
}
