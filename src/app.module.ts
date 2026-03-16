import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { LostPetsModule } from './lost-pets/lost-pets.module';
import { FoundPetsModule } from './found-pets/found-pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';
import { FoundPet } from './core/db/entities/found-pet.entity';
import { LostPet } from './core/db/entities/lost-pet.entity';

@Module({
  imports: [EmailModule, LostPetsModule, FoundPetsModule, TypeOrmModule.forRoot({
    host: envs.DB_HOST,
    type:'postgres',
    port: envs.DB_PORT,
    database:envs.DB_NAME,
    username:envs.DB_USER,
    password:envs.DB_PASSWORD,
    entities:[FoundPet,LostPet],
    synchronize:false,
    migrations: []
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
