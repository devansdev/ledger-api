import { Module } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { LedgerController } from './ledger.controller';
import { Ledger } from './entities/ledger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ledger])],
  controllers: [LedgerController],
  providers: [LedgerService],
  exports: [LedgerService]
})
export class LedgerModule {}
