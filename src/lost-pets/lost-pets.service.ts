import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { LostPetDto } from 'src/core/interfaces/LostPet.interface';
import { generateMapboxImage } from 'src/core/utils/utils';
import { generateLostPetEmailTemplate } from './templates/lost-pet-email.template';
import {logger} from 'src/config/logger';
import Redis from 'ioredis';
import { envs } from 'src/config/envs';
// Ajusta la ruta


const CACHE_KEY_ALL_LOST_PETS = 'lostPets:all';
@Injectable()
export class LostPetsService {


    constructor(
        // 1. Inyectamos el repositorio de la entidad
        @InjectRepository(LostPet)
        private readonly lostPetRepository: Repository<LostPet>,
        
        private readonly emailService: EmailService
    ) {}

    private readonly redis = new Redis({
        host: envs.REDIS_HOST,
        port: envs.REDIS_PORT
});

async getLostPets() : Promise<LostPet[]> {
    try {

        logger.info("Consultando incidentes");
        const data = await this.redis.get(CACHE_KEY_ALL_LOST_PETS) ?? "[]";
        const cacheIncidents = JSON.parse(data) as LostPet[];
        if(cacheIncidents.length>0){
            logger.info("Incidentes en cache");
            return cacheIncidents;
        }

        const lostPets = await this.lostPetRepository.find();
        logger.info("[IncidentService] Guardando incidentes en cache");
        const lostPetsString = JSON.stringify(lostPets);
        this.redis.set(CACHE_KEY_ALL_LOST_PETS,lostPetsString);
        return lostPets
    } catch (error) {
        logger.error(error);
        return [];
    }
}



 async createLostPet(dto: LostPetDto): Promise<boolean> {
    const newPet = this.lostPetRepository.create({
        ...dto,
        location: {
            type: 'Point',
            coordinates: [dto.lon, dto.lat] 
        }
    });
    logger.info("creando registro de mascota perdida");
    await this.lostPetRepository.save(newPet);
    await this.redis.del(CACHE_KEY_ALL_LOST_PETS);
    const mapImageUrl = generateMapboxImage(dto.lat, dto.lon);
    const template = generateLostPetEmailTemplate(dto,mapImageUrl);
    
    try {
        await this.emailService.sendEmail({
            to: dto.ownerEmail,
            subject: `Reporte de extravío: ${dto.name}`,
            html: template
        });
        return true;
    } catch (error) {
        console.error('Error enviando el correo:', error);
        return false;
    }
}
}