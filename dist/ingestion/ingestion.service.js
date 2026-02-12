"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const meter_reading_history_entity_1 = require("./entities/meter-reading-history.entity");
const meter_latest_status_entity_1 = require("./entities/meter-latest-status.entity");
const vehicle_reading_history_entity_1 = require("./entities/vehicle-reading-history.entity");
const vehicle_latest_status_entity_1 = require("./entities/vehicle-latest-status.entity");
const device_mapping_entity_1 = require("./entities/device-mapping.entity");
let IngestionService = class IngestionService {
    constructor(meterHistoryRepo, meterLatestRepo, vehicleHistoryRepo, vehicleLatestRepo, mappingRepo) {
        this.meterHistoryRepo = meterHistoryRepo;
        this.meterLatestRepo = meterLatestRepo;
        this.vehicleHistoryRepo = vehicleHistoryRepo;
        this.vehicleLatestRepo = vehicleLatestRepo;
        this.mappingRepo = mappingRepo;
    }
    async ingestMapping(vehicleId, meterId) {
        await this.mappingRepo.save({ vehicleId, meterId });
    }
    async ingestMeter(data) {
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
    async ingestVehicle(data) {
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
};
exports.IngestionService = IngestionService;
exports.IngestionService = IngestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(meter_reading_history_entity_1.MeterReadingHistory)),
    __param(1, (0, typeorm_1.InjectRepository)(meter_latest_status_entity_1.MeterLatestStatus)),
    __param(2, (0, typeorm_1.InjectRepository)(vehicle_reading_history_entity_1.VehicleReadingHistory)),
    __param(3, (0, typeorm_1.InjectRepository)(vehicle_latest_status_entity_1.VehicleLatestStatus)),
    __param(4, (0, typeorm_1.InjectRepository)(device_mapping_entity_1.DeviceMapping)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], IngestionService);
//# sourceMappingURL=ingestion.service.js.map