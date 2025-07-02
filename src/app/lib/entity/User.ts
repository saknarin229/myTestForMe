

import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 50 })
  User_name?: string;

  @Column({ unique: true }) //ห้ามซ้ำ
  User_email?: string;

  @Column()
  User_password?: string;

  @Column({ default: null })
  User_token?: string;

  @Column({ default: '0' })
  User_status?: string;
  
}

