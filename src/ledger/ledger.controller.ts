import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FilterLedgerDto } from './filter-ledger.dto';
import { LedgerService } from './ledger.service';

@Controller('/')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get('filter')
  findAll(@Query() filterLedgerDto:FilterLedgerDto) {
    return this.ledgerService.filter(filterLedgerDto);
  }
}
