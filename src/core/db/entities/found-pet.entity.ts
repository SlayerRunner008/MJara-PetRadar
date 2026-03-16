import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Point } from 'geojson';

@Entity('found_pets')
export class FoundPet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  species!: string;

  @Column({ nullable: true })
  breed?: string;

  @Column()
  color!: string;

  @Column()
  size!: string;

  @Column('text')
  description!: string;

  @Column({ name: 'photo_url', nullable: true })
  photoUrl?: string;

  @Column({ name: 'finder_name' })
  finderName!: string;

  @Column({ name: 'finder_email' })
  finderEmail!: string;

  @Column({ name: 'finder_phone' })
  finderPhone!: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location!: Point;

  @Column()
  address!: string;

  @Column({ name: 'found_date', type: 'timestamp' })
  foundDate!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}