import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { FoundPet } from 'src/core/db/entities/found-pet.entity';
import { FoundPetDto } from 'src/core/interfaces/FoundPet.interface';
import { generateFoundPetEmailTemplate } from './found-pet-email.template';


@Injectable()
export class FoundPetsService {
    constructor(
        @InjectRepository(FoundPet)
        private readonly foundPetRepository: Repository<FoundPet>,
        private readonly emailService: EmailService
    ) {}

    async createFoundPet(dto: FoundPetDto): Promise<boolean> {
        const newPet = this.foundPetRepository.create({
            ...dto,
            location: {
                type: 'Point',
                coordinates: [dto.lon, dto.lat]
            }
        });

        await this.foundPetRepository.save(newPet);

        const template = generateFoundPetEmailTemplate(dto);

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
