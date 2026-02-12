import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('vehicle_readings_history')
@Index(['vehicleId', 'timestamp'])
export class VehicleReadingHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    vehicleId: string;

    @Column('float')
    kwhDeliveredDc: number;

    @Column('float')
    soc: number;

    @Column('float')
    voltage: number;

    @Column('float', { nullable: true })
    temperature: number;

    @Column('timestamp')
    timestamp: Date;
}
