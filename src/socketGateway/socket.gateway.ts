import { UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, OnGatewayInit, WsException } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthJWTGuard } from "../common/guards/auth-jwt.guard.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthJwtService } from "../common/guards/auth-jwt.service.js";
@WebSocketGateway({
    cors: {
        origin: "*"
    }
})

@UseGuards(AuthJWTGuard)
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    constructor(private readonly authJwtService: AuthJwtService) { }

    @WebSocketServer()
    server!: Server; // socket.io server instance

    @SubscribeMessage("m")
    handleEvent(@MessageBody() message: string, @ConnectedSocket() socket: Socket): string {
        // console.log(message);

        socket.emit("mrply", "repliyng to the message");
        return "Hi";
    }

    afterInit(server: any) {
        this.server.use(async (socket, next) => {
            try {
                const decoded: JwtPayload | string = this.authJwtService.verifyToken(socket)
                if (!decoded) {
                    console.error(decoded);
                    return next(new WsException("Unauthorized"));
                }
                socket.data.user = decoded;
                next();
            }
            catch (error) {
                console.error(error);
                return next(new WsException("Unauthorized"));
            }
        });
    }

    handleConnection(socket: Socket) {
        console.log(socket.data.user.name, " connected");
    }

    handleDisconnect(socket: Socket, reason?: string) {
        console.log(socket.data.user.name, " disconnected");
    }

    // @SubscribeMessage("mrply")
    // handleReply(@MessageBody() message: string, @ConnectedSocket() client: Socket): null {
    //     console.log("reply message", message);
    //     return null;
    // }
}
