import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { FoundPet } from 'src/core/db/entities/found-pet.entity';
import { FoundPetDto } from 'src/core/interfaces/FoundPet.interface';
import { generateFoundPetEmailTemplate } from './templates/found-pet-email.template';
import { logger } from 'src/config/logger';
import { CacheService } from 'src/cache/cache.service';
import { LostPetsService } from 'src/lost-pets/lost-pets.service';

const CACHE_KEY_ALL_FOUND_PETS = 'foundPets:all';
const SEARCH_RADIUS_METERS = 500;

@Injectable()
export class FoundPetsService {
    constructor(
        @InjectRepository(FoundPet)
        private readonly foundPetRepository: Repository<FoundPet>,
        private readonly emailService: EmailService,
        private readonly cacheService: CacheService,
        private readonly lostPetsService: LostPetsService,
    ) {}

    async getFoundPets(): Promise<FoundPet[]> {
        try {
            logger.info('Consultando mascotas encontradas');
            const cached = await this.cacheService.get<FoundPet[]>(CACHE_KEY_ALL_FOUND_PETS);
            if (cached && cached.length > 0) {
                logger.info('Mascotas encontradas en cache');
                return cached;
            }

            const foundPets = await this.foundPetRepository.find();
            await this.cacheService.set(CACHE_KEY_ALL_FOUND_PETS, foundPets);
            return foundPets;
        } catch (error) {
            logger.error(error);
            return [];
        }
    }

    async createFoundPet(dto: FoundPetDto): Promise<boolean> {
        const newPet = this.foundPetRepository.create({
            ...dto,
            location: {
                type: 'Point',
                coordinates: [dto.lon, dto.lat]
            }
        });
        logger.info('Creando registro de mascota encontrada');
        await this.foundPetRepository.save(newPet);
        await this.cacheService.delete(CACHE_KEY_ALL_FOUND_PETS);

        const nearbyLostPets = await this.lostPetsService.getPetsByRadius(dto.lat, dto.lon, SEARCH_RADIUS_METERS);
        logger.info(
            `Mascotas perdidas activas encontradas en un radio de ${SEARCH_RADIUS_METERS}m: ${nearbyLostPets.length}`,
            { nearbyLostPets }
        );

        const template = generateFoundPetEmailTemplate(dto, nearbyLostPets);

        try {
            await this.emailService.sendEmail({
                to: dto.finderEmail,
                subject: `Gracias por reportar: Mascota Encontrada`,
                html: template
            });
            return true;
        } catch (error) {
            console.error('Error enviando el correo:', error);
            return false;
        }
    }
}
