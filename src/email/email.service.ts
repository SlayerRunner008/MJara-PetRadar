import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { envs } from 'src/config/envs';
@Injectable()
export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_PASSWORD
        }
    });  

    
}
