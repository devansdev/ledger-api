import { Double } from "typeorm";

// define payment frequency as an enum
export enum PaymentFrquency {
    WEEKLY = 'WEEKLY',
    FORTNIGHTLY = 'FORTNIGHTLY',
    MONTHLY = 'MONTHLY'
}

export interface LedgerType {
    id?: number;
    start_date: Date;
    end_date: Date;
    frequency: PaymentFrquency;
    weekly_rent: number;
    timezone: string;
}

export interface LineItem {
    start_date: string;
    end_date: string;
    line_item: number;
}