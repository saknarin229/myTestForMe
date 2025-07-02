import Redis from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
})

redis.on('error', (err) => {
  console.error('[Redis Error]', err)
})

export default redis
