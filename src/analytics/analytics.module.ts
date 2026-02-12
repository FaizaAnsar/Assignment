import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { MeterReadingHistory } from '../ingestion/entities/meter-reading-history.entity';
import { VehicleReadingHistory } from '../ingestion/entities/vehicle-reading-history.entity';
import { DeviceMapping } from '../ingestion/entities/device-mapping.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MeterReadingHistory,
            VehicleReadingHistory,
            DeviceMapping,
        ]),
    ],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
})
export class AnalyticsModule { }
