import { initializeDataSourceProduct } from '../lib/data-source'
import { Order } from '../lib/entity/Order'
import { OrderItem } from '../lib/entity/OrderItem'

export class ordersService {

    public async createOrder(data: { userId: number, items: { productId: number; qty: number; price: number }[] }) {
            const db = await initializeDataSourceProduct()
            const queryRunner = await db.createQueryRunner()
            await queryRunner.connect()
            await queryRunner.startTransaction()

        try {

            // 1. สร้าง Order
            const order = new Order()
            order.userId = data.userId
            order.total = data.items.reduce((sum, item) => sum + item.price * item.qty, 0)
            const savedOrder = await queryRunner.manager.save(order)

            // 2. เพิ่ม Order Items
            for (const item of data.items) {
                const orderItem = new OrderItem()
                orderItem.order = savedOrder
                orderItem.productId = item.productId
                orderItem.quantity = item.qty
                orderItem.price = item.price
                await queryRunner.manager.save(orderItem)
            }

            // Commit ทุกอย่าง
            await queryRunner.commitTransaction()
            return { success: true, orderId: savedOrder.id }

        } catch (err) {
            // Rollback ถ้ามี error
            await queryRunner.rollbackTransaction()

        } finally {
            // ปิดการเชื่อมต่อ
            await queryRunner.release()
        }
    }

    public async getdataAll(){
        const db = await initializeDataSourceProduct()
        const OrderRepo = await db.getRepository(Order)
        const order = await OrderRepo.find({
            relations: ['items']
        })
        return order
    }

    public async getdataID(id:number){
        const db = await initializeDataSourceProduct()
        const OrderRepo = await db.getRepository(Order)
        const order = await OrderRepo.findOne({
            where: { id: id },
            relations: ['items']
        })
        return order
    }
}


// queryRunner.manager.save(...) สั่งเตรียม insert/update แต่ยังไม่ commit
// await queryRunner.commitTransaction() บอกให้ฐานข้อมูล "ยืนยัน" และ "บันทึกถาวร"
// await queryRunner.rollbackTransaction() ยกเลิกคำสั่งทั้งหมดที่อยู่ใน transaction