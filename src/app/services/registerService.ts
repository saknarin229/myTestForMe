import { Repository } from 'typeorm';
import { optionService } from './optionService'
import { initializeDataSourceUser } from '../lib/data-source';
import { User } from '../lib/entity/User'


export class registerService {
    public async register(name: string, email: string, password: string) {
        const db = await initializeDataSourceUser() //เรียก connect database
        const userRepo = db.getRepository(User) //เรียก connect table

        if (await this.ensureEmailNotExists(userRepo, email)) { // เช็กเมล ซ้ำในฐานข้อมูล
            return [
                { success: false, message: 'Email already exists' },
                { status: 400 }
            ]
        }

        // const userRepo = AppDataSource.getRepository(User)
        const user = new User()
        user.User_name = name.trim()
        user.User_email = email.trim()
        user.User_password = password.trim()

        if(!name.trim()){
            return [
                { success: false, message: 'Invalid name is null' },
                { status: 400 }
            ];
        }

        if(!password.trim()){
            return [
                { success: false, message: 'Invalid password is null' },
                { status: 400 }
            ];
        }

        const option = new optionService()
        if (!await option.MakeSureEmailFormat(email)) { // check format email
            return [
                { success: false, message: 'Invalid email format' },
                { status: 400 }
            ];
        }
        const datas = await userRepo.save(user)
        if (datas) { // ✅ INSERT ลงฐานข้อมูล
            datas.User_password = "**********"
            return [
                { success: true, message: 'Register success', datas:datas },
                { status: 200 }
            ]
        }

        return [
            { success: false, message: 'New data created successfully' },
            { status: 201 }
        ]

    }

    private async ensureEmailNotExists(userRepo: Repository<User>, email: string) {
        const existingUser = await userRepo.findOne({ where: { User_email: email } });
        if (existingUser) {
            return true
        } else {
            return false
        }
    }


}