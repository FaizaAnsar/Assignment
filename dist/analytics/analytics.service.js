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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const meter_reading_history_entity_1 = require("../ingestion/entities/meter-reading-history.entity");
const vehicle_reading_history_entity_1 = require("../ingestion/entities/vehicle-reading-history.entity");
const device_mapping_entity_1 = require("../ingestion/entities/device-mapping.entity");
let AnalyticsService = class AnalyticsService {
    constructor(meterRepo, vehicleRepo, mappingRepo) {
        this.meterRepo = meterRepo;
        this.vehicleRepo = vehicleRepo;
        this.mappingRepo = mappingRepo;
    }
    async getPerformance(vehicleId) {
        const mapping = await this.mappingRepo.findOne({ where: { vehicleId } });
        if (!mapping) {
            throw new common_1.NotFoundException(`No meter mapping found for vehicle ${vehicleId}`);
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
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(meter_reading_history_entity_1.MeterReadingHistory)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_reading_history_entity_1.VehicleReadingHistory)),
    __param(2, (0, typeorm_1.InjectRepository)(device_mapping_entity_1.DeviceMapping)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map