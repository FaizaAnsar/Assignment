import { Controller, Post, Body } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { MeterReadingDto } from './dto/meter-reading.dto';
import { VehicleReadingDto } from './dto/vehicle-reading.dto';

@Controller('ingestion')
export class IngestionController {
    constructor(private readonly ingestionService: IngestionService) { }

    @Post('meter')
    async ingestMeter(@Body() dto: MeterReadingDto) {
        await this.ingestionService.ingestMeter(dto);
        return { status: 'success', type: 'meter' };
    }

    @Post('vehicle')
    async ingestVehicle(@Body() dto: VehicleReadingDto) {
        await this.ingestionService.ingestVehicle(dto);
        return { status: 'success', type: 'vehicle' };
    }

    @Post('mapping')
    async ingestMapping(@Body() body: { vehicleId: string; meterId: string }) {
        await this.ingestionService.ingestMapping(body.vehicleId, body.meterId);
        return { status: 'success', type: 'mapping' };
    }
}
