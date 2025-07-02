import { NextResponse } from 'next/server'
import { ordersService } from '../../services/ordersService'

export async function POST(req: Request) {

    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('uid');
        const body = await req.json()
        const { productId, qty, price } = body

        if (userId && productId && qty && price) {

            const data = {
                userId: parseInt(userId as string),
                items: [{
                    productId: parseInt(productId),
                    qty: parseInt(qty),
                    price: parseInt(price)
                }]
            }

            const _ordersService = new ordersService()
            return NextResponse.json(await _ordersService.createOrder(data))
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ status: 500, message: 'Something went wrong' })
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const find = searchParams.get('find');
        const _ordersService = new ordersService()
        let request
        if (find === 'all') {
            request = await _ordersService.getdataAll()
        } else {
            request = await _ordersService.getdataID(parseInt(id as string))
        }
        return NextResponse.json(request)

    } catch (err) {
        console.log(err)
        return NextResponse.json({ status: 500, message: 'Something went wrong' })
    }
}