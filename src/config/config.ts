
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
  },
};
