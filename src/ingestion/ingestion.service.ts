import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeterReadingHistory } from './entities/meter-reading-history.entity';
import { MeterLatestStatus } from './entities/meter-latest-status.entity';
import { VehicleReadingHistory } from './entities/vehicle-reading-history.entity';
import { VehicleLatestStatus } from './entities/vehicle-latest-status.entity';
import { DeviceMapping } from './entities/device-mapping.entity';
import { MeterReadingDto } from './dto/meter-reading.dto';
import { VehicleReadingDto } from './dto/vehicle-reading.dto';

@Injectable()
export class IngestionService {
    constructor(
        @InjectRepository(MeterReadingHistory)
        private meterHistoryRepo: Repository<MeterReadingHistory>,
        @InjectRepository(MeterLatestStatus)
        private meterLatestRepo: Repository<MeterLatestStatus>,
        @InjectRepository(VehicleReadingHistory)
        private vehicleHistoryRepo: Repository<VehicleReadingHistory>,
        @InjectRepository(VehicleLatestStatus)
        private vehicleLatestRepo: Repository<VehicleLatestStatus>,
        @InjectRepository(DeviceMapping)
        private mappingRepo: Repository<DeviceMapping>,
    ) { }

    async ingestMapping(vehicleId: string, meterId: string) {
        await this.mappingRepo.save({ vehicleId, meterId });
    }

    async ingestMeter(data: MeterReadingDto) {
        await this.meterHistoryRepo.save({
            meterId: data.meterId,
            kwhConsumedAc: data.kwhConsumedAc,
            voltage: data.voltage,
            timestamp: new Date(data.timestamp),
        });

        await this.meterLatestRepo.save({
            meterId: data.meterId,
            kwhConsumedAc: data.kwhConsumedAc,
            voltage: data.voltage,
            timestamp: new Date(data.timestamp),
        });
    }

    async ingestVehicle(data: VehicleReadingDto) {
        await this.vehicleHistoryRepo.save({
            vehicleId: data.vehicleId,
            kwhDeliveredDc: data.kwhDeliveredDc,
            soc: data.soc,
            voltage: data.voltage,
            temperature: data.temperature,
            timestamp: new Date(data.timestamp),
        });

        await this.vehicleLatestRepo.save({
            vehicleId: data.vehicleId,
            kwhDeliveredDc: data.kwhDeliveredDc,
            soc: data.soc,
            voltage: data.voltage,
            temperature: data.temperature,
            timestamp: new Date(data.timestamp),
        });
    }
}
