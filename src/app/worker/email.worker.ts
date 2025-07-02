import { Worker } from 'bullmq'
import IORedis from 'ioredis'

const connection = new IORedis()

new Worker('email', async (job) => {
  console.log('📨 Email job:', job.data)
}, { connection })



// // worker/email.worker.ts
// import { Worker } from 'bullmq'
// import IORedis from 'ioredis'

// const connection = new IORedis()

// const emailWorker = new Worker('email', async (job) => {
//   console.log('📨 ส่งอีเมล:', job.data)
// }, { connection })

// emailWorker.on('completed', (job) => {
//   console.log(`✅ Job ${job.id} เสร็จแล้ว`)
// })

// emailWorker.on('failed', (job, err) => {
//   console.error(`❌ Job ${job?.id} ล้มเหลว:`, err)
// })
