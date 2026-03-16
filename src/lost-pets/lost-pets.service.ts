import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class LostPetsService {

    constructor(private readonly emailService:EmailService){}

    async createLostPet():Promise<Boolean>{
        const res = true 
        return res;
    }
}
