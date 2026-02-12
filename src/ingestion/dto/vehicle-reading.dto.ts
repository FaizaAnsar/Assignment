import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class VehicleReadingDto {
    @IsString()
    vehicleId: string;

    @IsNumber()
    kwhDeliveredDc: number;

    @IsNumber()
    soc: number;

    @IsNumber()
    voltage: number;

    @IsNumber()
    @IsOptional()
    temperature: number;

    @IsDateString()
    timestamp: string;
}
