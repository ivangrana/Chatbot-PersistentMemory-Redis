"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const config_1 = require("../config/config");
const redisClient = (0, redis_1.createClient)({
    socket: {
        host: config_1.config.redis.host,
        port: Number(config_1.config.redis.port),
    }
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
(async () => {
    await redisClient.connect();
})();
exports.default = redisClient;
//# sourceMappingURL=redis_client.js.map