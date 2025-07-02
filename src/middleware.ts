import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import dotenv from 'dotenv'
// dotenv.config(); // โหลดค่าจาก .env


export const config = {
  matcher: '/api/auth/:path*',
}

export async function middleware(request: NextRequest) {
  const start = Date.now()

  const response = NextResponse.next()

  const url = request.nextUrl.pathname
  const method = request.method

  // รอให้ response เสร็จแล้วค่อยคำนวณเวลา
  response.headers.set('x-start-time', start.toString())

  // ดัก response เสร็จแล้ว (optional step)
  response.headers.append('x-log-middleware', 'true')
  const duration = Date.now() - start

  // ส่ง log ไปที่ API
  
  fetch(`${process.env.NEXT_PUBLIC_PATH_DEVE}/api/log`, {
    method: 'POST',
    body: JSON.stringify({
      url,
      method,
      duration,
      timestamp: new Date().toISOString(),
    }),
    headers: { 'Content-Type': 'application/json' },
  }).catch((err) => {
    console.error('log error', err)
  })

  return response
}