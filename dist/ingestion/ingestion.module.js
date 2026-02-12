"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ingestion_service_1 = require("./ingestion.service");
const meter_reading_history_entity_1 = require("./entities/meter-reading-history.entity");
const meter_latest_status_entity_1 = require("./entities/meter-latest-status.entity");
const vehicle_reading_history_entity_1 = require("./entities/vehicle-reading-history.entity");
const vehicle_latest_status_entity_1 = require("./entities/vehicle-latest-status.entity");
const device_mapping_entity_1 = require("./entities/device-mapping.entity");
const ingestion_controller_1 = require("./ingestion.controller");
let IngestionModule = class IngestionModule {
};
exports.IngestionModule = IngestionModule;
exports.IngestionModule = IngestionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                meter_reading_history_entity_1.MeterReadingHistory,
                meter_latest_status_entity_1.MeterLatestStatus,
                vehicle_reading_history_entity_1.VehicleReadingHistory,
                vehicle_latest_status_entity_1.VehicleLatestStatus,
                device_mapping_entity_1.DeviceMapping,
            ]),
        ],
        controllers: [ingestion_controller_1.IngestionController],
        providers: [ingestion_service_1.IngestionService],
        exports: [],
    })
], IngestionModule);
//# sourceMappingURL=ingestion.module.js.map