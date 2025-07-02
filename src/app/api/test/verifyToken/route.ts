

import { optionService } from '../../../services/optionService'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const option = new optionService()
    const { searchParams } = new URL(request.url)
    const _request = await option.JwtverifyToken(searchParams.get('token') as string)
    return NextResponse.json(_request)
}