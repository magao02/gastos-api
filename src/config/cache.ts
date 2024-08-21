import { RedisOptions } from 'ioredis';

interface IcacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: 'redis' | 'memory';
}

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD || undefined,
    },
  },
  driver: 'redis',
} as IcacheConfig;
