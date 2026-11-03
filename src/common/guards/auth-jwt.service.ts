import { Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

@Injectable()
export class AuthJwtService {
    constructor() {

    }

    verifyToken(request: Socket): JwtPayload | string {
        try {
            const jwtToken: string | undefined = this.extractToken(request);
            const decoded: JwtPayload | string = this.verifyJwtToken(jwtToken);
            return decoded;
        } catch (error) {
            throw error;
        }
    }

    private extractToken(request: Socket): string {
        try {
            const authToken: string | undefined = request.handshake.headers.authorization;
            if (!authToken) {
                throw new WsException("Unauthorized: Authorization header is required");
            }

            const jwtToken: string | undefined = authToken.split("Bearer ")[1];
            if (!jwtToken) {
                throw new WsException("Unauthorized: JWT token is missing");
            }

            return jwtToken;
        } catch (error) {
            // console.error(error);
            throw error;
        }
    }

    private verifyJwtToken(jwtToken: string): JwtPayload | string {
        try {
            const decoded: JwtPayload | string = jwt.verify(jwtToken, "a-string-secret-at-least-256-bits-long", { algorithms: ["HS256"] });
            return decoded;
        } catch (error) {
            throw new WsException("Unauthorized: Invalid token");
        }
    }

}