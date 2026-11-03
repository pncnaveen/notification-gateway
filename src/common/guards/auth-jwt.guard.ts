import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { AuthJwtService } from "./auth-jwt.service.js";

@Injectable()
export class AuthJWTGuard implements CanActivate {
    constructor(private readonly authJwtService: AuthJwtService) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        try {
            const request: Socket = context.switchToWs().getClient<Socket>();
            const decoded: JwtPayload | string = this.authJwtService.verifyToken(request);
            if (!decoded) {
                throw new WsException("Unauthorized: Invalid token");
            }
            request.data.user = decoded;
            return true;
        } catch (error) {
            throw new WsException("invalid token");
        }
    }
}