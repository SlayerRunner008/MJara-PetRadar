import { Body, Controller, Post } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';

@Controller('lost-pets')
export class LostPetsController {

    constructor(private readonly LostPetsService:LostPetsService){


    }

    @Post()
       async createLostPet(@Body() LostPet: LostPet){
            const res = await this.LostPetsService.createLostPet(LostPet);
            return res;


        };
    
}
