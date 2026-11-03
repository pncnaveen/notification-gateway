import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthJWTGuard } from "./auth-jwt.guard.js";
import { AuthJwtService } from "./auth-jwt.service.js";


@Module({
    // providers: [{
    //     provide: APP_GUARD,
    //     useClass: AuthJWTGuard
    // }]
    providers: [AuthJwtService, AuthJWTGuard],
    exports: [AuthJwtService, AuthJWTGuard]
})

export class AuthJwtModule { }