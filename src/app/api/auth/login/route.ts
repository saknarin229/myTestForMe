import { NextResponse } from 'next/server'
import {loginService} from '../../../services/loginService'
import {optionService} from '../../../services/optionService'
import {User} from '../../../lib/entity/User'
import {initializeDataSourceUser} from '../../../lib/data-source'
import { stringify } from 'querystring'

export async function POST(request: Request) {

    try{

        const body = await request.json()
        const {email, password } = body
        const services = new loginService()        
        
        const response = await services.login(email, password)


        if(response[0].success === false){
            return NextResponse.json(response)
        }else{
            const option = new optionService()
            const data = await option.setCookie('token', response[0].message as string, 1)

            const db = await initializeDataSourceUser() //เรียก connect database
            const userRepo = db.getRepository(User) //เรียก connect table
            await userRepo.update({ id:response[0].id }, { User_token: response[0].message })
            return  data
        }
    }catch(err){
        return NextResponse.json([{status:500}])
    }
}