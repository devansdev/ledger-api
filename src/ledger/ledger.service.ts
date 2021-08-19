import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LineItem, PaymentFrquency } from 'src/types/ledger';
import { Repository } from 'typeorm';
import { Ledger } from './entities/ledger.entity';
import { FilterLedgerDto } from './filter-ledger.dto';
import moment from 'moment';
import momentz from 'moment-timezone';

@Injectable()
export class LedgerService {
  constructor(
    @InjectRepository(Ledger)
    private usersRepository: Repository<Ledger>
  ) {}
  async filter(params: FilterLedgerDto) {
    const ledgerQuery = this.usersRepository.createQueryBuilder();
    if (params.start_date) {
      ledgerQuery.where('start_date = :startDate',{startDate: moment(params.start_date).format("YYYY-MM-DD HH:mm:ss")});
    }
    if (params.end_date) {
      ledgerQuery.andWhere('end_date = :endDate',{endDate: moment(params.end_date).format("YYYY-MM-DD HH:mm:ss")});
    }
    if (params.frequency) {
      ledgerQuery.andWhere('frequency = :frequency',{frequency: params.frequency});
    }
    if (params.weekly_rent) {
      ledgerQuery.andWhere('weekly_rent = :weeklyRent',{weeklyRent: params.weekly_rent});
    }
    if (params.timezone && momentz.tz.zone(params.timezone) !== null) {
      ledgerQuery.andWhere('timezone = :timezone',{timezone: params.timezone});
    }
    const result = await ledgerQuery.getMany();

    // format line items before sending the response
    return this.formatLedger(result);
  }

  formatLedger(entries: Ledger[]) {
    const formatted: LineItem[][]|null = [];
    for (const entry of entries) {
      formatted.push(this.calculateLineItem(entry));
    }

    return formatted;
  }

  calculateLineItem(ledgerEntry: Ledger):LineItem[] {
    switch (ledgerEntry.frequency) {
      case PaymentFrquency.WEEKLY:
        return this.calculateWeeklyLineItems(ledgerEntry.start_date, ledgerEntry.end_date, ledgerEntry.weekly_rent);
      case PaymentFrquency.FORTNIGHTLY:
        return this.calculateFortnightlyLineItems(ledgerEntry.start_date, ledgerEntry.end_date, ledgerEntry.weekly_rent);
      case PaymentFrquency.MONTHLY:
          return this.calculateMonthlyLineItems(ledgerEntry.start_date, ledgerEntry.end_date, ledgerEntry.weekly_rent);
      default:
        return [];
    }
  }

  calculateWeeklyLineItems(startDate: string, endDate: string, weeklyRent: number) {
    const lineItems: LineItem[] = [];
    const weeks = Math.trunc(moment.duration(moment(endDate).diff(moment(startDate))).asWeeks());
    const days = moment.duration(moment(endDate).diff(moment(startDate))).asDays() % 7 + 1; // adds 1 to include the start date
    let dateStart: moment.Moment = moment(startDate);
    let dateEnd: moment.Moment = moment(startDate).subtract(1, 'day');
    for (let fnIndex = 0; fnIndex < weeks; fnIndex++) {
      dateEnd.add(1, 'week');

      // Weekly - the amount will be provided the weekly amount in the request
      lineItems.push({ start_date: dateStart.toISOString(), end_date: dateEnd.toISOString(), line_item: weeklyRent });
      dateStart.add(1, 'week');
    }

    /*For a line item that is cut short because of the end date of the lease, 
    the amount would be weeklyAmount / 7 * numberOfDays where numberOfDays is the
    number of days covered in that line item.*/
    lineItems.push({ start_date: dateEnd.add(1, 'day').toISOString(), end_date: moment(endDate).toISOString(), line_item: Math.round((((weeklyRent / 7) * days) + Number.EPSILON) * 100) / 100 });

    return lineItems;
  }

  calculateFortnightlyLineItems(startDate: string, endDate: string, weeklyRent: number) {
    const lineItems: LineItem[] = [];
    const weeks = Math.trunc(moment.duration(moment(endDate).diff(moment(startDate))).asWeeks());
    const fortnights = Math.trunc(weeks / 2);
    
    const days = (weeks%2)* 7 + moment.duration(moment(endDate).diff(moment(startDate))).asDays() % 7 + 1; // adds 1 to include the start date
    let dateStart: moment.Moment = moment(startDate);
    let dateEnd: moment.Moment = moment(startDate).subtract(1, 'day');
    for (let fnIndex = 0; fnIndex < fortnights; fnIndex++) {
      dateEnd.add(2, 'weeks');

      // Fortnightly - the amount will be twice the provided weekly amount
      lineItems.push({ start_date: dateStart.toISOString(), end_date: dateEnd.toISOString(), line_item: weeklyRent * 2 });
      dateStart.add(2, 'weeks');
    }

    /*For a line item that is cut short because of the end date of the lease, 
    the amount would be weeklyAmount / 7 * numberOfDays where numberOfDays is the
    number of days covered in that line item.*/
    lineItems.push({ start_date: dateEnd.add(1, 'day').toISOString(), end_date: moment(endDate).toISOString(), line_item: Math.round((((weeklyRent / 7) * days) + Number.EPSILON) * 100) / 100 });

    return lineItems;
  }

  calculateMonthlyLineItems(startDate: string, endDate: string, weeklyRent: number) {
    const lineItems: LineItem[] = [];
    
    let dateStart: moment.Moment = moment(startDate);
    let monthIndex: number = 1;
    let dateEnd: moment.Moment = moment(startDate).add(monthIndex, 'month');
    while (dateEnd.isSameOrBefore(endDate)) {
      
      // Monthly - amount will be (weeklyAmount / 7) * 365 / 12
      lineItems.push({ start_date: dateStart.toISOString(), end_date: dateEnd.toISOString(), line_item: Math.round((((365/12) * (weeklyRent / 7)) + Number.EPSILON) * 100)/100 });
      monthIndex ++;
      dateStart = moment(dateEnd.toISOString()).add(1, 'day');
      dateEnd = moment(startDate).add(monthIndex, 'months');
    }

    let days: number = moment(endDate).diff(dateStart, 'days') + 1;

    /*For a line item that is cut short because of the end date of the lease, 
    the amount would be weeklyAmount / 7 * numberOfDays where numberOfDays is the
    number of days covered in that line item.*/
    if (lineItems.length > 0) {
      lineItems.push({ start_date: dateStart.toISOString(), end_date: moment(endDate).toISOString(), line_item: Math.round((((weeklyRent / 7) * days) + Number.EPSILON) * 100) / 100 });
    }
    

    return lineItems;
  }
}
