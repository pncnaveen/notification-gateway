import { Module } from "@nestjs/common";
import { SocketGateway } from "./socket.gateway.js";
import { AuthJwtModule } from "../common/guards/auth-jwt.module.js";


@Module({
    imports: [AuthJwtModule],
    providers: [SocketGateway],
})

export class SocketModule {}