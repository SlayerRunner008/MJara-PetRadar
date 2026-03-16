import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- 1. Importa TypeOrmModule
import { FoundPetsService } from './found-pets.service';
import { FoundPetsController } from './found-pets.controller';
import { EmailModule } from 'src/email/email.module';
import { FoundPet } from 'src/core/db/entities/found-pet.entity'; // <-- 2. Importa la entidad FoundPet

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([FoundPet])
  ],
  providers: [FoundPetsService],
  controllers: [FoundPetsController]
})
export class FoundPetsModule {}