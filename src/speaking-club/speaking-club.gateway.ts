import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { UserService } from 'src/user/user.service';
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
  },
})
export class SpeakingClubGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly userService: UserService
  ) { }
  async handleConnection(socket: Socket) {
    const cookies = socket.handshake.headers.cookie
    if (!cookies) {
      throw new UnauthorizedException({
        user: 'An error occurred while authenticating the user. No cookies found.',
      });
    }
    const parseCookies = parse(cookies);
    const sessionToken = parseCookies['next-auth.session-token'];
    const user = await this.userService.verifyUser(sessionToken)
    if (!user) {
      throw new UnauthorizedException({
        user: 'User no longer exists',
      });
    }
    console.log(user);
  }
  handleDisconnect(socket: Socket) {
    // console.log(socket);
  }
}
