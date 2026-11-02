import { Module } from "@nestjs/common";
import { SocketModule } from "./socketGateway/socket.module.js";
import { AuthJwtModule } from "./common/guards/auth-jwt.module.js";

@Module({
    imports: [SocketModule, AuthJwtModule]
})

export class AppModule {};