
import jwt from 'jsonwebtoken';
import redis from '../lib/redis';

import { parse, serialize } from 'cookie'
import { NextResponse } from 'next/server';

const SECRET_TOKEN = 'i-lek';

export class optionService {

    public async RedisDel(key: string) {
        try {
            await redis?.del(key)
        } catch (err) {
            console.log(err)
        }
    }

    public async RedisSet(cacheKey: string, data: any, time: number) {
        // ตรวจสอบ cache ก่อน
        const cached = await redis?.get(cacheKey)
        if (cached) {
            return JSON.parse(cached)
        }

        //เก็บ cache จาก database
        // 'EX', 300	หน่วยวินาที	(ใช้บ่อยที่สุด)
        // 'PX', 300000	หน่วย มิลลิวินาที	
        // 'NX'	set ถ้า key ยังไม่มี	กัน overwrite
        // 'XX'	set ถ้า key มีอยู่แล้ว	

        return await redis?.set(cacheKey, JSON.stringify(data), 'EX', time) //300 วินาที = 5 นาที

    }

    public async randomCode(tb: any) {
        const code = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
        return await this.checkCode(tb, code.toString())
    }

    public async checkCode(tb: any, code: string) {
        const check = await tb.findOne({ where: { Products_sku: code } })
        if (check) this.randomCode(tb)
        return code
    }

    public async dateTimeSet() {
        const now = new Date();
        return now.toISOString();
    }

    public async jwtSignToken(payload: object) {
        return jwt.sign(payload, SECRET_TOKEN, { expiresIn: '1d' }); //'1d' = 1 วัน (24 ชั่วโมง) ใช้รูปแบบอื่นได้ เช่น '15m', '7d', '2h' ฯลฯ
    }

    public async JwtverifyToken(token: string) {
        return jwt.verify(token, SECRET_TOKEN);
    }

    public async MakeSureEmailFormat(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        if (isValidEmail) {
            return true
        } else {
            return false
        }
    }

    public async setCookie(key: string, value: string, day: number) {
        const cookie = serialize(key, value, {
            httpOnly: true, // cookie ไม่สามารถเข้าถึงได้จาก client-side JS
            secure: false, //ใน production (ที่ใช้ HTTPS) จะใช้ secure: true เพื่อให้ cookie ส่งได้แค่ในการเชื่อมต่อที่ปลอดภัย (HTTPS) ||| ใน development (เช่น localhost) จะใช้ secure: false เพื่อให้ cookie ส่งผ่าน HTTP ได้ (ไม่ต้องใช้ HTTPS ใน localhost)
            maxAge: (60 * 60 * 24) * day, // อายุ cookie 1 วัน (in seconds)
            path: '/', // path ที่ cookie ใช้ได้
        })

        const response = NextResponse.json({ success: true, token: value });
        response.headers.set('Set-Cookie', cookie);

        return response;
    }

    public async getCookie(key: string, request: Request) {
        const cookies = parse(request.headers.get('cookie') || ''); // ดึง cookie string แล้ว parse เป็นอ็อบเจ็กต์
        if (cookies) return cookies[key]
    }

    public async delCookie(key: string) {
        const cookie = serialize(key, "", {
            httpOnly: true, // cookie ไม่สามารถเข้าถึงได้จาก client-side JS
            secure: false, //ใน production (ที่ใช้ HTTPS) จะใช้ secure: true เพื่อให้ cookie ส่งได้แค่ในการเชื่อมต่อที่ปลอดภัย (HTTPS) ||| ใน development (เช่น localhost) จะใช้ secure: false เพื่อให้ cookie ส่งผ่าน HTTP ได้ (ไม่ต้องใช้ HTTPS ใน localhost)
            maxAge: 0, // อายุ cookie 1 วัน (in seconds)
            path: '/', // path ที่ cookie ใช้ได้
        })
    }

    public async generateCSV(data: Record<string, any>[]){
        if (!data.length) return ''
        const headers = Object.keys(data[0])
        const csvRows = [
            headers.join(','), // หัวตาราง
            ...data.map(row =>
                headers.map(header => JSON.stringify(row[header] ?? '')).join(','),
            ),
        ]

        return csvRows.join('\n')
    }


}