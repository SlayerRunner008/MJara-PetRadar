

export interface FoundPetDto {
    species: string;
    breed?: string;
    color: string;
    size: string;
    description: string;
    photoUrl?: string;
    finderName: string;
    finderEmail: string;
    finderPhone: string;
    lat: number;
    lon: number;
    address: string;
    foundDate: Date;
}