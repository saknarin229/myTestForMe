
import { JwtPayload } from 'jsonwebtoken'
import { optionService } from "../../../services/optionService";
import { NextResponse } from 'next/server'
import { User } from '../../../lib/entity/User'
import { initializeDataSourceUser } from '../../../lib/data-source'


export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if(token){
    const option = new optionService()
    const verifyToken = await option.JwtverifyToken(token)
    const userId = (verifyToken as JwtPayload).id

    const db = await initializeDataSourceUser()
    const userRepo = db.getRepository(User)
    userRepo.update({id:userId},{User_token:""})

    parseInt(userId)

  }
    
    return NextResponse.json([{status:200, message:'logout success'}])
}