import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity({ name: 'users' })
@Unique(['name'])
export class User extends BaseEntity {
  constructor(user?: Partial<User>) {
    super();
    this.id = user?.id;
    this.name = user?.name;
    this.senha = user?.senha;
    this.email = user?.email;
    this.cargo = user?.cargo;
    this.deletedAt = user?.deletedAt;
  }

  @ApiProperty({
    name: 'id',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    name: 'This is name user',
    type: String,
  })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @ApiProperty({
    name: 'This is password user',
    type: String,
  })
  @Column({ nullable: false, type: 'varchar', length: 20 })
  senha: string;

  @ApiProperty({
    name: 'This is email user',
    type: String,
  })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @ApiProperty({
    name: 'This is user post',
    type: String,
  })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  cargo: string;

  @DeleteDateColumn()
  public deletedAt: Date;
}
