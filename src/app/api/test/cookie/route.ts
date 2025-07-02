import { optionService } from '../../../services/optionService'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const o = searchParams.get('o')
    const option = new optionService()
    let _request;
    if(o === 'get'){
       _request = await option.getCookie('token', request)
       return NextResponse.json(_request)
    }else if(o === 'set'){
        _request = await option.jwtSignToken({ id: 1, email: 'xxx@xxx.com' })
        return await option.setCookie('token', _request, 1)
    }
}