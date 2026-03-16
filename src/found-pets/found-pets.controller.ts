import { Body, Controller, Post } from '@nestjs/common';
import { FoundPetsService } from './found-pets.service';
import type { FoundPetDto } from 'src/core/interfaces/FoundPet.interface';

@Controller('found-pets')
export class FoundPetsController {
    constructor(private readonly foundPetsService: FoundPetsService) {}

    @Post()
    async createFoundPet(@Body() foundPetDto: FoundPetDto) {
        return await this.foundPetsService.createFoundPet(foundPetDto);
    }
}