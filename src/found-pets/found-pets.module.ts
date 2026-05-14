import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoundPetsService } from './found-pets.service';
import { FoundPetsController } from './found-pets.controller';
import { EmailModule } from 'src/email/email.module';
import { FoundPet } from 'src/core/db/entities/found-pet.entity';
import { CacheModule } from 'src/cache/cache.module';
import { LostPetsModule } from 'src/lost-pets/lost-pets.module';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([FoundPet]),
    CacheModule,
    LostPetsModule
  ],
  providers: [FoundPetsService],
  controllers: [FoundPetsController]
})
export class FoundPetsModule {}
