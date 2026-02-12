import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('vehicle_latest_status')
export class VehicleLatestStatus {
    @PrimaryColumn()
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
