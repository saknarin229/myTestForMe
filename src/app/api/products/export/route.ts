// app/api/export-products/route.ts
import { optionService } from '../../../services/optionService'
import { productService } from '../../../services/productService'
import { NextResponse } from 'next/server'

export async function GET() {
  const _optionService = new optionService()
  const _productService = new productService()
  const requestDataProduct = await _productService.selectAll()
  const csv = await _optionService.generateCSV(requestDataProduct)
  
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="products.csv"',
    },
  })
}