import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getPerformance(vehicleId: string): Promise<{
        vehicleId: string;
        totalEnergyConsumedAc: number;
        totalEnergyDeliveredDc: number;
        efficiencyRatio: number;
        averageBatteryTemperature: number;
    }>;
}
