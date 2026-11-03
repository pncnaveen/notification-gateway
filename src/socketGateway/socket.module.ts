import { Module } from "@nestjs/common";
import { SocketGateway } from "./socket.gateway.js";
import { AuthJwtModule } from "../common/guards/auth-jwt.module.js";
import { RedisModule } from "../persistance/redis/redis.module.js";


@Module({
    imports: [AuthJwtModule, RedisModule],
    providers: [SocketGateway],
})

export class SocketModule {}