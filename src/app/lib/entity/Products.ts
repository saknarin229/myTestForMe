

import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  Products_id?: number;

  @Column({ length: 10, unique: true }) //ห้ามซ้ำ
  Products_sku?: string;

  @Column() 
  Products_name?: string;

  @Column()
  Products_price?: string;

  @Column()
  Products_image?: string;

  @Column({type: 'datetime', nullable: true })
  created_at?: Date;

  @Column({type: 'datetime', nullable: true })
  updated_at?: Date;

  @Column({ default: '0' })
  Products_status?: string;
  
}