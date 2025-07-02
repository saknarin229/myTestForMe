import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

// import type เพื่อไม่ให้เกิด circular dependency runtime
import type { Order } from '../entity/Order'    // import type เพื่อ typing
import { Order as OrderEntity } from '../entity/Order'  // import ตัวจริง (value) เพื่อใช้งาน runtime


@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    productId?: number

    @Column()
    quantity?: number

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price?: number

    @ManyToOne(() => OrderEntity, order => order.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderId' })
    order?: Order
}
