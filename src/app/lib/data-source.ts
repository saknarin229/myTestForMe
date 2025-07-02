
import 'reflect-metadata';
import dotenv from 'dotenv'
import { DataSource } from "typeorm"
import { User } from './entity/User'
import { Products } from './entity/Products'
import { Order } from './entity/Order'
import { OrderItem } from './entity/OrderItem'

dotenv.config(); // โหลดค่าจาก .env

export const AppDataSourceUser = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_USER,
  entities: [User],
  synchronize: true,
  logging: false,
})

export const AppDataSourceProduct = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_PRODUCT,
  entities: [Products, Order, OrderItem],
  synchronize: true,
  logging: false,
})



export async function initializeDataSourceUser() {
  if (!AppDataSourceUser.isInitialized) {
    await AppDataSourceUser.initialize()
  }
  return AppDataSourceUser
}

export async function initializeDataSourceProduct() {
  if (!AppDataSourceProduct.isInitialized) {
    await AppDataSourceProduct.initialize()
  }
  return AppDataSourceProduct
}
