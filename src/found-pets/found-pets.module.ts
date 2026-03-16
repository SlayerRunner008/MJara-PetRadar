import { Module } from '@nestjs/common';
import { FoundPetsService } from './found-pets.service';
import { FoundPetsController } from './found-pets.controller';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports:[EmailModule],
  providers: [FoundPetsService],
  controllers: [FoundPetsController]
})
export class FoundPetsModule {}
