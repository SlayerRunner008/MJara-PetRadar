import { Module } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';
import { LostPetsController } from './lost-pets.controller';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports:[EmailModule],
  providers: [LostPetsService],
  controllers: [LostPetsController]
})
export class LostPetsModule {}
