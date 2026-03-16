import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { LostPetDto } from 'src/core/interfaces/LostPet.interface';
import { generateMapboxImage } from 'src/core/utils/utils';
import { generateLostPetEmailTemplate } from './templates/lost-pet-email.template';
// Ajusta la ruta

@Injectable()
export class LostPetsService {

    constructor(
        // 1. Inyectamos el repositorio de la entidad
        @InjectRepository(LostPet)
        private readonly lostPetRepository: Repository<LostPet>,
        
        private readonly emailService: EmailService
    ) {}

 async createLostPet(dto: LostPetDto): Promise<boolean> {
    const newPet = this.lostPetRepository.create({
        ...dto,
        location: {
            type: 'Point',
            coordinates: [dto.lon, dto.lat] 
        }
    });
    await this.lostPetRepository.save(newPet);

    const template = generateLostPetEmailTemplate(dto);
    
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