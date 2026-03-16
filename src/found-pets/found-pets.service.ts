import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { EmailOptions } from 'src/email/mail-options.interface';

@Injectable()
export class FoundPetsService {

        constructor(private readonly emailService:EmailService){}


    
        async createFoundPet():Promise<Boolean>{

            const options: EmailOptions = {
            to : "mjaravillasana@gmail.com",
            subject:"found-pet",
            html: 
            `
             
            `
        

        }
            const res = true 
            return res;
        }
}
