import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestionService } from './ingestion.service';
import { MeterReadingHistory } from './entities/meter-reading-history.entity';
import { MeterLatestStatus } from './entities/meter-latest-status.entity';
import { VehicleReadingHistory } from './entities/vehicle-reading-history.entity';
import { VehicleLatestStatus } from './entities/vehicle-latest-status.entity';
import { DeviceMapping } from './entities/device-mapping.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MeterReadingHistory,
            MeterLatestStatus,
            VehicleReadingHistory,
            VehicleLatestStatus,
            DeviceMapping,
        ]),
    ],
    providers: [IngestionService],
    exports: [],
})
export class IngestionModule { }
