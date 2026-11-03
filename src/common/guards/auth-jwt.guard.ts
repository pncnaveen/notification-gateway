import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

@Injectable()
export class AuthJWTGuard implements CanActivate {
    constructor() {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request: Socket = context.switchToWs().getClient<Socket>();
        const authToken: string | undefined = request.handshake.headers.authorization;
        if (!authToken) {
            throw new WsException("Unauthorized: No token provided");
        }

        const jwtToken: string | undefined = authToken.split("Bearer ")[1];
        
        if (!jwtToken) {
            throw new WsException("Unauthorized: Token is required");
        }

        try {
            const decoded: JwtPayload | string = jwt.verify(jwtToken, "a-string-secret-at-least-256-bits-long", { algorithms: ["HS256"] });
            request.data.user = decoded;
            return true;
        } catch (error) {
            throw new WsException("Unauthorized: Invalid token");
        }

        return false;
    }
}