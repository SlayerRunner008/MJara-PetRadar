import { Controller, Post } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';

@Controller('lost-pets')
export class LostPetsController {

    constructor(private readonly LostPetsService:LostPetsService){


    }

    @Post()
       async createLostPet(){
            const res = await this.LostPetsService.createLostPet();
            return res;


        };
    
}
