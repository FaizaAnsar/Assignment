import { Repository } from 'typeorm';
import { MeterReadingHistory } from '../ingestion/entities/meter-reading-history.entity';
import { VehicleReadingHistory } from '../ingestion/entities/vehicle-reading-history.entity';
import { DeviceMapping } from '../ingestion/entities/device-mapping.entity';
export declare class AnalyticsService {
    private meterRepo;
    private vehicleRepo;
    private mappingRepo;
    constructor(meterRepo: Repository<MeterReadingHistory>, vehicleRepo: Repository<VehicleReadingHistory>, mappingRepo: Repository<DeviceMapping>);
    getPerformance(vehicleId: string): Promise<{
        vehicleId: string;
        totalEnergyConsumedAc: number;
        totalEnergyDeliveredDc: number;
        efficiencyRatio: number;
        averageBatteryTemperature: number;
    }>;
}
