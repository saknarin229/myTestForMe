import { NextResponse } from 'next/server'
import { registerService } from '../../../services/registerService'
import { User } from '../../../lib/entity/User'
import { initializeDataSourceUser } from '../../../lib/data-source';

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body
    const services = new registerService()
    const response = await services.register(name, email, password)
    return NextResponse.json(response)
  } catch (err) {
    console.log(err)
    return NextResponse.json([{ status: 500, message: 'Something is wrong' }])
  }
}

export async function GET(request: Request) {
  const db = await initializeDataSourceUser() //เรียก connect database
  const userRepo = db.getRepository(User) //เรียก connect table

  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  // console.log(id)
  let users;
  if (id) {
    users = await userRepo.find({ where: { User_status: (0).toString(), id:parseInt(id as string)} })
    // console.log(users)
  } else {
    users = await userRepo.find({ where: { User_status: (0).toString() } })
  }
  return NextResponse.json({ success: true, datas: users })
}