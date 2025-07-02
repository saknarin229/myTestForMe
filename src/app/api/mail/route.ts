import { NextResponse } from 'next/server'
import {emailQueueService} from '../../services/emailQueueService'

export async function POST(req: Request) {
    const _emailQueueService = new emailQueueService()
    const body = await req.json()
    const { mailTo, mailTitle, mailBody } = body
    const requestMail = await _emailQueueService.MailQueue(mailTo, mailTitle, mailBody)
    return NextResponse.json(requestMail)
}
