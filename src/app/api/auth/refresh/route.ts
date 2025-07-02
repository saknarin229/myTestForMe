import { NextResponse } from 'next/server'
import { initializeDataSourceUser } from '../../../lib/data-source'
import { User } from '../../../lib/entity/User'
import { optionService } from '../../../services/optionService'

export async function GET(request: Request) {
    try {
        const option = new optionService()
        const authHeader = request.headers.get('authorization') || ''
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
        const _request = await option.JwtverifyToken(token as string)

        if (typeof _request === 'object') {
            const { id, name, email } = _request
            const newToken = await option.jwtSignToken({ id: id, name: name, email: email }) // new jwt refresh
            const data = await option.setCookie('token', newToken as string, 1)
            const db = await initializeDataSourceUser() //เรียก connect database
            const userRepo = db.getRepository(User) //เรียก connect table
            await userRepo.update({ id:id }, { User_token: newToken }) // นำ new jwt ไป update ใน sql database
            return NextResponse.json({ status: 200, token: newToken })
        }else{
            return NextResponse.json({ status: 201, token: [] })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ status: 500, message: 'Something is wrong' })
    }

}