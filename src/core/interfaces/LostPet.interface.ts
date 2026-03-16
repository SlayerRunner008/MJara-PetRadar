
export interface LostPetDto {
    name: string;
    species: string;
    breed: string;
    color: string;
    size: string;
    description: string;
    photoUrl?: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    lat: number;
    lon: number;
    address: string;
    lostDate: Date;
}