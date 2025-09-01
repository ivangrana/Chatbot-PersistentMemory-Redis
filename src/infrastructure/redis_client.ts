
import { createClient } from 'redis';
import { config } from '../config/config';

const redisClient = createClient({
  socket: {
    host: config.redis.host,
    port: Number(config.redis.port),
  }
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

export default redisClient;
