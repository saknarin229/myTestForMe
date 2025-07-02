// import { bull } from '../lib/bull'
import { emailQueue } from '../lib/bull'

const fromMail = 'user0@example.com'
export class emailQueueService {

    public async MailQueue(mailTo: string, mailSubject: string, mailBody: string) {

        await emailQueue.add('send-email',{
            from: fromMail, // ผู้ส้ง
            to: mailTo, // ผู้รับ
            subject: mailSubject, //เรื่อง title
            body: mailBody //เนื้อหา
        });

        const status = await emailQueue.getJobCounts()
        // const result = await request.finished()  // ✅ รอจน job เสร็จ

        return { status: 200 , messge:'send mail', getJobStatus:status}

    }

}

