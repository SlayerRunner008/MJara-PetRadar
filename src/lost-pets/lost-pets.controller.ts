import { Body, Controller, Get, Post } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import type { LostPetDto } from 'src/core/interfaces/LostPet.interface';

@Controller('lost-pets')
export class LostPetsController {

    constructor(private readonly LostPetsService:LostPetsService){


    }

    @Get()
    async getAllPets(){
        const res = await this.LostPetsService.getLostPets();
        return res;
    }

    @Post()
       async createLostPet(@Body() LostPet: LostPetDto){
            const res = await this.LostPetsService.createLostPet(LostPet);
            return res;
        };
    
}
