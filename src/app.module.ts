import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestionModule } from './ingestion/ingestion.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { MeterReadingHistory } from './ingestion/entities/meter-reading-history.entity';
import { MeterLatestStatus } from './ingestion/entities/meter-latest-status.entity';
import { VehicleReadingHistory } from './ingestion/entities/vehicle-reading-history.entity';
import { VehicleLatestStatus } from './ingestion/entities/vehicle-latest-status.entity';
import { DeviceMapping } from './ingestion/entities/device-mapping.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT, 10),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [
                MeterReadingHistory,
                MeterLatestStatus,
                VehicleReadingHistory,
                VehicleLatestStatus,
                DeviceMapping,
            ],
            synchronize: true,
        }),
        IngestionModule,
        AnalyticsModule,
    ],
})
export class AppModule { }
