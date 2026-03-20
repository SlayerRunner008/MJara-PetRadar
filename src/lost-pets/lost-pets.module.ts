import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LostPetsService } from './lost-pets.service';
import { LostPetsController } from './lost-pets.controller';
import { EmailModule } from 'src/email/email.module';
import { LostPet } from 'src/core/db/entities/lost-pet.entity'; 
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([LostPet]),
    CacheModule
  ],
  providers: [LostPetsService],
  controllers: [LostPetsController]
})
export class LostPetsModule {}