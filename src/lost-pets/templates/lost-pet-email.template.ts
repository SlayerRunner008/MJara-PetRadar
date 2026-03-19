import { LostPetDto } from "src/core/interfaces/LostPet.interface";

export const generateLostPetEmailTemplate = (pet: LostPetDto, mapImageUrl: string): string => {
    return `
    <div style="background-color: #f4f7f6; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            
            <div style="background-color: #e74c3c; color: #ffffff; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">¡AYÚDANOS A ENCONTRARLO!</h1>
            </div>

            <div style="padding: 30px;">
                <h2 style="color: #2c3e50; margin-top: 0;">Se busca a: <span style="color: #e74c3c;">${pet.name}</span></h2>
                
                <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <div style="flex: 1; background-color: #fdf2f2; padding: 15px; border-radius: 10px; border-left: 5px solid #e74c3c;">
                        <p style="margin: 5px 0;"><strong>Especie:</strong> ${pet.species}</p>
                        <p style="margin: 5px 0;"><strong>Raza:</strong> ${pet.breed}</p>
                        <p style="margin: 5px 0;"><strong>Color:</strong> ${pet.color}</p>
                        <p style="margin: 5px 0;"><strong>Tamaño:</strong> ${pet.size}</p>
                    </div>
                </div>

                <p style="color: #7f8c8d; line-height: 1.6;">
                    <strong>Descripción:</strong> ${pet.description}
                </p>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

                <p style="color: #2c3e50; font-weight: bold; margin-bottom: 10px;">
                    📍 Visto por última vez en: <span style="font-weight: normal; color: #555;">${pet.address}</span>
                </p>

                <div style="text-align: center; margin: 20px 0;">
                    <img src="${mapImageUrl}" alt="Mapa de ubicación" style="width: 100%; border-radius: 12px; border: 1px solid #ddd; display: block;">
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <p style="margin-bottom: 15px; font-size: 14px; color: #95a5a6;">Si tienes información, contacta al dueño inmediatamente:</p>
                    <a href="tel:${pet.ownerPhone}" style="background-color: #e74c3c; color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 4px 10px rgba(231, 76, 60, 0.3);">
                        📞 Llamar a ${pet.ownerName}
                    </a>
                </div>
            </div>

            <div style="background-color: #2c3e50; color: #bdc3c7; padding: 15px; text-align: center; font-size: 12px;">
                <p style="margin: 0;">Este es un aviso automático generado por <strong>Pet Radar</strong>.</p>
                <p style="margin: 5px 0 0 0;">Universidad La Salle Bajío - Proyecto de Ingeniería</p>
            </div>
        </div>
    </div>
    `;
};