import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('meter_latest_status')
export class MeterLatestStatus {
    @PrimaryColumn()
    meterId: string;

    @Column('float')
    kwhConsumedAc: number;

    @Column('float')
    voltage: number;

    @Column('timestamp')
    timestamp: Date;
}
