import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
@WebSocketGateway({
    cors:{
        origin: "*"
    }
})
export class SocketGateway {
   
    @SubscribeMessage("m")
    handleEvent(@MessageBody() message: string, @ConnectedSocket() client: Socket): null {
        console.log(message);
        client.emit("mrply", "reply message");
        return null;
    }

    @SubscribeMessage("mrply")
    handleReply(@MessageBody() message: string, @ConnectedSocket() client: Socket): string {
        return "Hello world";
    }
}