import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthJWTGuard } from "./auth-jwt.guard.js";


@Module({
    // providers: [{
    //     provide: APP_GUARD,
    //     useClass: AuthJWTGuard
    // }]
    providers: [AuthJWTGuard]
})

export class AuthJwtModule { }