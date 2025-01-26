import { createClient } from "redis";

const redis = createClient();

redis.on('error', console.error);
redis.on('connect', () => console.log('Redis is online'));

(async() => {
    await redis.connect();
})();

export default redis