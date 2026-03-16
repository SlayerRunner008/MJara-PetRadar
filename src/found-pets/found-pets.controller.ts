import { Controller, Post } from '@nestjs/common';
import { FoundPetsService } from './found-pets.service';

@Controller('found-pets')
export class FoundPetsController {

    constructor(private readonly FoundPetsService : FoundPetsService){}

    @Post()
    async createFoundPet(){
        const res = await this.FoundPetsService.createFoundPet();
        return res;
    }
}
