import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan } from 'typeorm';
import { MeterReadingHistory } from '../ingestion/entities/meter-reading-history.entity';
import { VehicleReadingHistory } from '../ingestion/entities/vehicle-reading-history.entity';
import { DeviceMapping } from '../ingestion/entities/device-mapping.entity';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(MeterReadingHistory)
        private meterRepo: Repository<MeterReadingHistory>,
        @InjectRepository(VehicleReadingHistory)
        private vehicleRepo: Repository<VehicleReadingHistory>,
        @InjectRepository(DeviceMapping)
        private mappingRepo: Repository<DeviceMapping>,
    ) { }

    async getPerformance(vehicleId: string) {
        const mapping = await this.mappingRepo.findOne({ where: { vehicleId } });
        if (!mapping) {
            throw new NotFoundException(`No meter mapping found for vehicle ${vehicleId}`);
        }

        const start = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const acResult = await this.meterRepo
            .createQueryBuilder('meter')
            .select('MAX(meter.kwhConsumedAc) - MIN(meter.kwhConsumedAc)', 'totalAc')
            .where('meter.meterId = :meterId', { meterId: mapping.meterId })
            .andWhere('meter.timestamp > :start', { start })
            .getRawOne();

        const totalAc = parseFloat(acResult.totalAc) || 0;
        const dcResult = await this.vehicleRepo
            .createQueryBuilder('vehicle')
            .select('MAX(vehicle.kwhDeliveredDc) - MIN(vehicle.kwhDeliveredDc)', 'totalDc')
            .addSelect('AVG(vehicle.temperature)', 'avgTemp')
            .where('vehicle.vehicleId = :vehicleId', { vehicleId })
            .andWhere('vehicle.timestamp > :start', { start })
            .getRawOne();

        const totalDc = parseFloat(dcResult.totalDc) || 0;
        const avgTemp = parseFloat(dcResult.avgTemp) || 0;

        const efficiency = totalAc > 0 ? totalDc / totalAc : 0;

        return {
            vehicleId,
            totalEnergyConsumedAc: totalAc,
            totalEnergyDeliveredDc: totalDc,
            efficiencyRatio: parseFloat(efficiency.toFixed(4)),
            averageBatteryTemperature: parseFloat(avgTemp.toFixed(2)),
        };
    }
}
