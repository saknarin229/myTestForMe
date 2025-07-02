// export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { appendFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'

export async function POST(req: Request) {
  const data = await req.json()

  const logDir = path.join(process.cwd(), 'logs')
  const logPath = path.join(logDir, 'middleware.log')

  // สร้างโฟลเดอร์ logs ถ้ายังไม่มี
  if (!existsSync(logDir)) {
    mkdirSync(logDir)
  }

  const logEntry = `[${data.timestamp}] ${data.method} ${data.url} - ${data.duration}ms\n`

  appendFileSync(logPath, logEntry)

  // console.log(logPath);

  return NextResponse.json({ status: 'logged' })
}
