"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const ingestion_module_1 = require("./ingestion/ingestion.module");
const analytics_module_1 = require("./analytics/analytics.module");
const meter_reading_history_entity_1 = require("./ingestion/entities/meter-reading-history.entity");
const meter_latest_status_entity_1 = require("./ingestion/entities/meter-latest-status.entity");
const vehicle_reading_history_entity_1 = require("./ingestion/entities/vehicle-reading-history.entity");
const vehicle_latest_status_entity_1 = require("./ingestion/entities/vehicle-latest-status.entity");
const device_mapping_entity_1 = require("./ingestion/entities/device-mapping.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT, 10),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: [
                    meter_reading_history_entity_1.MeterReadingHistory,
                    meter_latest_status_entity_1.MeterLatestStatus,
                    vehicle_reading_history_entity_1.VehicleReadingHistory,
                    vehicle_latest_status_entity_1.VehicleLatestStatus,
                    device_mapping_entity_1.DeviceMapping,
                ],
                synchronize: true,
            }),
            ingestion_module_1.IngestionModule,
            analytics_module_1.AnalyticsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map