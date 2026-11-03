
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private redisClient!: Redis;
    constructor() {

    }

    onModuleInit() {
        this.redisClient = new Redis({
            host: "localhost",
            port: 6379,
            password: "",
            db: 0,
            maxRetriesPerRequest: null
        });
    }

    onModuleDestroy() {
        this.redisClient.quit();
    }
    async setValue(key: string, value: boolean) {
        try {
            const result = await this.redisClient.set(key, String(value));
            return result;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to set value in Redis");
        }
    }

}