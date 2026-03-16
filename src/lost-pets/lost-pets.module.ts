import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- 1. Importa esto
import { LostPetsService } from './lost-pets.service';
import { LostPetsController } from './lost-pets.controller';
import { EmailModule } from 'src/email/email.module';
import { LostPet } from 'src/core/db/entities/lost-pet.entity'; // <-- 2. Importa tu entidad

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([LostPet]) 
  ],
  providers: [LostPetsService],
  controllers: [LostPetsController]
})
export class LostPetsModule {}