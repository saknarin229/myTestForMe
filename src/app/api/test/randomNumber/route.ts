import { optionService } from '../../../services/optionService'
import { NextResponse } from 'next/server'
import { initializeDataSourceProduct } from '../../../lib/data-source'
import { Products } from '../../../lib/entity/Products'

export async function GET(request: Request) {
    
    const option = new optionService()
    const db = await initializeDataSourceProduct()
    const code = await option.randomCode(db.getRepository(Products))


    return NextResponse.json({ code: code })
}