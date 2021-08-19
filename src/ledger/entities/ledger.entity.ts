import { PaymentFrquency } from "src/types/ledger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ledger')
export class Ledger {
    @PrimaryGeneratedColumn({type:'integer'})
    id: number;

    @Column({type: 'timestamp'})
    start_date: string;

    @Column({type: 'timestamp'})
    end_date: string;

    @Column({ type: 'enum', enum: PaymentFrquency })
    frequency: PaymentFrquency;

    @Column({type: 'double', default: 0})
    weekly_rent: number;

    @Column({type: 'varchar', length: 100})
    timezone: string;
}
