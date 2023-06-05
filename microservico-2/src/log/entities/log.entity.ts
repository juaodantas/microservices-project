import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'logs' })
export class Log extends BaseEntity {
  constructor(log?: Partial<Log>) {
    super();
    this.id = log?.id;
    this.payload = log?.payload;
    this.timestamp = log?.timestamp;
    this.action = log?.action;
    this.deletedAt = log?.deletedAt;
  }

  @ApiProperty({
    name: 'id',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    name: 'This is name log',
    type: String,
  })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  action: string;

  @ApiProperty({
    name: 'This is email log',
    type: String,
  })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  payload: string;

  @ApiProperty({
    name: 'This is log timestamp',
    type: String,
  })
  @Column({ type: 'timestamp', nullable: false })
  timestamp: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
