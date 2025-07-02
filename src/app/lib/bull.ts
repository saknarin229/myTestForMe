import { Queue } from 'bullmq'
import IORedis from 'ioredis'
const connection = new IORedis({
  host: 'localhost',
  port: 6379
})

export const emailQueue = new Queue('email', { connection })

// import Queue from 'bull'


// export const bull = new Queue('email', {
//   redis: {
//     host: process.env.REDIS_HOST || 'localhost',
//     port: Number(process.env.REDIS_PORT) || 6379,
//   },
// })

