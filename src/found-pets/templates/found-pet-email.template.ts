import { FoundPetDto } from "src/core/interfaces/FoundPet.interface";
import { generateMapboxImage } from "src/core/utils/utils";

export const generateFoundPetEmailTemplate = (pet: FoundPetDto): string => {
    const mapImageUrl = generateMapboxImage(pet.lat, pet.lon);
    console.log(mapImageUrl)

    return `
    <div style="background-color: #f4f7f6; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            
            <div style="background-color: #27ae60; color: #ffffff; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">¡MASCOTA RESCATADA!</h1>
            </div>

            <div style="padding: 30px;">
                <h2 style="color: #2c3e50; margin-top: 0;">Se encontró un: <span style="color: #27ae60;">${pet.species}</span></h2>
                
                <div style="background-color: #f2fdf5; padding: 15px; border-radius: 10px; border-left: 5px solid #27ae60; margin-bottom: 20px;">
                    <p style="margin: 5px 0;"><strong>Raza:</strong> ${pet.breed || 'Desconocida'}</p>
                    <p style="margin: 5px 0;"><strong>Color:</strong> ${pet.color}</p>
                    <p style="margin: 5px 0;"><strong>Tamaño:</strong> ${pet.size}</p>
                </div>

                <p style="color: #7f8c8d; line-height: 1.6;">
                    <strong>Descripción del hallazgo:</strong> ${pet.description}
                </p>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

                <p style="color: #2c3e50; font-weight: bold; margin-bottom: 10px;">
                    📍 Ubicación del rescate: <span style="font-weight: normal; color: #555;">${pet.address}</span>
                </p>

                <div style="text-align: center; margin: 20px 0;">
                    <img src="${mapImageUrl}" alt="Mapa de ubicación" style="width: 100%; border-radius: 12px; border: 1px solid #ddd; display: block;">
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <p style="margin-bottom: 15px; font-size: 14px; color: #95a5a6;">Datos de quien lo resguardó:</p>
                    <a href="mailto:${pet.finderEmail}" style="background-color: #27ae60; color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px; display: inline-block;">
                        📧 Contactar a ${pet.finderName}
                    </a>
                </div>
            </div>

            <div style="background-color: #2c3e50; color: #bdc3c7; padding: 15px; text-align: center; font-size: 12px;">
                <p style="margin: 0;"><strong>Pet Radar</strong> - Universidad La Salle Bajío</p>
            </div>
        </div>
    </div>
    `;
};