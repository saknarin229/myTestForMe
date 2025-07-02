import { Repository } from 'typeorm';
import { optionService } from './optionService'
import { initializeDataSourceUser } from '../lib/data-source';

import { User } from '../lib/entity/User'

export class loginService {
    public async login(email: string, password: string) {
        const db = await initializeDataSourceUser() //เรียก connect database
        const userRepo = db.getRepository(User) //เรียก connect table

        const _message = [
                { success: false, message: 'password is incorrect', id:undefined },
                { status: 200 }
            ]

        const existingUser = await userRepo.findOne({ where: { User_email: email } });

        try {
            if (existingUser) {
                
                if (existingUser.User_password === password) {
                    const id = existingUser.id
                    const User_name = existingUser.User_name
                    const User_email = existingUser.User_email
                    const option = new optionService()
                    const _request = await option.jwtSignToken({ id: id, name: User_name, email: User_email })
                    return [
                        {success: true, message: _request, id:id},
                        { status: 200 }
                    ]
                }
            }
        } catch (err) {
            
            return _message
        }


        return _message
    }
}

