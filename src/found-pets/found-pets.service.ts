import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class FoundPetsService {

        constructor(private readonly emailService:EmailService){}
    
        async createFoundPet():Promise<Boolean>{
            const res = true 
            return res;
        }
}
