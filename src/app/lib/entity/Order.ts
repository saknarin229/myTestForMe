// entity/Order.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { OrderItem } from '../entity/OrderItem'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    userId?: number

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total?: number

    @Column({ default: 'pending' })
    status?: string // ตัวอย่าง: 'pending', 'paid', 'shipped', 'cancelled'

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date

    @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
    items?: OrderItem[]
}
