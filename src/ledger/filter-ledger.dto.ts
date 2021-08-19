import { ApiProperty } from '@nestjs/swagger';
import {  IsDateString, IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { PaymentFrquency } from 'src/types/ledger';

export class FilterLedgerDto {
    @IsDateString()
    @IsOptional()
    @ApiProperty({
        format: 'Date',
        required: false
    })
    start_date?: Date;

    @IsDateString()
    @IsOptional()
    @ApiProperty({
        format: 'Date',
        required: false
    })
    end_date?: Date;

    @IsEnum(PaymentFrquency)
    @IsOptional()
    @ApiProperty({
        enum: PaymentFrquency,
        required: false
    })
    frequency?: PaymentFrquency;

    @IsNumberString()
    @IsOptional()
    @ApiProperty({
        format: 'Double',
        required: false
    })
    weekly_rent?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        format: 'String',
        required: false
    })
    timezone?: string;
}