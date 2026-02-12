import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('meter_readings_history')
@Index(['meterId', 'timestamp'])
export class MeterReadingHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    meterId: string;

    @Column('float')
    kwhConsumedAc: number;

    @Column('float')
    voltage: number;

    @Column('timestamp')
    timestamp: Date;
}
