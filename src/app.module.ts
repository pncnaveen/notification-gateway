import { Module } from "@nestjs/common";
import { SocketModule } from "./socketGateway/socket.module.js";

@Module({
    imports: [SocketModule]
})

export class AppModule {};