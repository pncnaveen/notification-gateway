import { UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { AuthJWTGuard } from "../common/guards/auth-jwt.guard.js";
@WebSocketGateway({
    cors:{
        origin: "*"
    }
})


export class SocketGateway {
    @UseGuards(AuthJWTGuard)
    @SubscribeMessage("m")
    handleEvent(@MessageBody() message: string, @ConnectedSocket() socket: Socket): string {
        // console.log(message);
        // console.log(socket.data.user);
        
        socket.emit("mrply", "repliyng to the message");
        return "Hi";
    }

    // @SubscribeMessage("mrply")
    // handleReply(@MessageBody() message: string, @ConnectedSocket() client: Socket): null {
    //     console.log("reply message", message);
    //     return null;
    // }
}