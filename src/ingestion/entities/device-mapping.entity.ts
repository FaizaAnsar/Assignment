import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('device_mapping')
export class DeviceMapping {
    @PrimaryColumn()
    vehicleId: string;

    @Column()
    meterId: string;
}
