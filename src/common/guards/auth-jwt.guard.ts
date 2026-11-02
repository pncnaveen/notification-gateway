import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AuthJWTGuard implements CanActivate {
    constructor(){

    }

    canActivate(context : ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToWs().getClient();
        const token = request.handshake.headers.authorization;
        if (token) {
            return true;
        }
        return false;
    }
}