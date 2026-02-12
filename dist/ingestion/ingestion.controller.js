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
exports.IngestionController = void 0;
const common_1 = require("@nestjs/common");
const ingestion_service_1 = require("./ingestion.service");
const meter_reading_dto_1 = require("./dto/meter-reading.dto");
const vehicle_reading_dto_1 = require("./dto/vehicle-reading.dto");
let IngestionController = class IngestionController {
    constructor(ingestionService) {
        this.ingestionService = ingestionService;
    }
    async ingestMeter(dto) {
        await this.ingestionService.ingestMeter(dto);
        return { status: 'success', type: 'meter' };
    }
    async ingestVehicle(dto) {
        await this.ingestionService.ingestVehicle(dto);
        return { status: 'success', type: 'vehicle' };
    }
    async ingestMapping(body) {
        await this.ingestionService.ingestMapping(body.vehicleId, body.meterId);
        return { status: 'success', type: 'mapping' };
    }
};
exports.IngestionController = IngestionController;
__decorate([
    (0, common_1.Post)('meter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [meter_reading_dto_1.MeterReadingDto]),
    __metadata("design:returntype", Promise)
], IngestionController.prototype, "ingestMeter", null);
__decorate([
    (0, common_1.Post)('vehicle'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicle_reading_dto_1.VehicleReadingDto]),
    __metadata("design:returntype", Promise)
], IngestionController.prototype, "ingestVehicle", null);
__decorate([
    (0, common_1.Post)('mapping'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IngestionController.prototype, "ingestMapping", null);
exports.IngestionController = IngestionController = __decorate([
    (0, common_1.Controller)('ingestion'),
    __metadata("design:paramtypes", [ingestion_service_1.IngestionService])
], IngestionController);
//# sourceMappingURL=ingestion.controller.js.map