

import { optionService } from '../../../services/optionService'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const option = new optionService()
    const _request = await option.jwtSignToken({ id: 1, email: 'xxx@xxx.com' })
    return NextResponse.json(_request)
}