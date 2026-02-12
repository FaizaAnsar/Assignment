import { Repository } from 'typeorm';
import { MeterReadingHistory } from './entities/meter-reading-history.entity';
import { MeterLatestStatus } from './entities/meter-latest-status.entity';
import { VehicleReadingHistory } from './entities/vehicle-reading-history.entity';
import { VehicleLatestStatus } from './entities/vehicle-latest-status.entity';
import { DeviceMapping } from './entities/device-mapping.entity';
import { MeterReadingDto } from './dto/meter-reading.dto';
import { VehicleReadingDto } from './dto/vehicle-reading.dto';
export declare class IngestionService {
    private meterHistoryRepo;
    private meterLatestRepo;
    private vehicleHistoryRepo;
    private vehicleLatestRepo;
    private mappingRepo;
    constructor(meterHistoryRepo: Repository<MeterReadingHistory>, meterLatestRepo: Repository<MeterLatestStatus>, vehicleHistoryRepo: Repository<VehicleReadingHistory>, vehicleLatestRepo: Repository<VehicleLatestStatus>, mappingRepo: Repository<DeviceMapping>);
    ingestMapping(vehicleId: string, meterId: string): Promise<void>;
    ingestMeter(data: MeterReadingDto): Promise<void>;
    ingestVehicle(data: VehicleReadingDto): Promise<void>;
}
