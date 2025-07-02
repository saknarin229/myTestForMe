
import { NextResponse } from 'next/server'
import { productService } from '../../../services/productService'
import { optionService } from '../../../services/optionService'

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get('name')?.toString() || "";
  const price = formData.get('price')?.toString() || "";
  const imageupload = formData.get('imageupload') as File;

  if (name && price) {
    const _productService = new productService()
    const request = await _productService.insert(name, price, imageupload)

    // set redis
    const _optionService = new optionService()
    const data = await _productService.selectAll()
    await _optionService.RedisDel('products:all')
    await _optionService.RedisSet('products:all', data, 300)

    return NextResponse.json({ status: 200, data: request })
  }

  return NextResponse.json({ status: 'Something went wrong' })

}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const formData = await req.formData();
    const name = formData.get('name')?.toString() || "";
    const price = formData.get('price')?.toString() || "";
    const imageupload = formData.get('imageupload') as File;

    let response;
    if (id && name && price) {
      const _productService = new productService()
      response = await _productService.update(parseInt(id as string), name, price, imageupload)

      // set redis
      const _optionService = new optionService()
      const data = await _productService.selectAll()
      await _optionService.RedisDel('products:all')
      await _optionService.RedisSet('products:all', data, 300)

      return NextResponse.json({ status: '200', data: response })
    }

  } catch (err) {
    return NextResponse.json({ status: '500', message: 'Something went wrong' })
  }

  return NextResponse.json({ status: '500', message: 'Something went wrong' })

}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const _productService = new productService()
    const request = await _productService.delete(parseInt(id as string))

    // set redis
    const data = request
    const _optionService = new optionService()
    await _optionService.RedisDel('products:all')
    if (request) {
      await _optionService.RedisSet('products:all', data, 300)
    }

    return NextResponse.json(request)
  } catch (err) {
    return NextResponse.json({ status: '500', message: 'Something went wrong' })
  }

}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const find = searchParams.get('find');

    const _productService = new productService()

    if (find === 'all') { // product all

      const request = await _productService.selectAll()
      const data = request
      const _optionService = new optionService()
      
      if (request) {
        return NextResponse.json(await _optionService.RedisSet('products:all', data, 300))
      }else{
        return NextResponse.json(request)
      }

    } else {

      const request = await _productService.selectID(parseInt(id as string))
      const data = request
      const _optionService = new optionService()
      if (request) {
        return NextResponse.json(await _optionService.RedisSet('products:all', data, 300))
      }else{
        return NextResponse.json(request)
      }
      
    }
  } catch (err) {
    return NextResponse.json({ status: '500', message: 'Something went wrong' })
  }

}