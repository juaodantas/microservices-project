import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class LogListItemDto {
  @IsNotEmpty({
    message: 'Informe o payload do log.',
  })
  @MaxLength(200, {
    message: 'O payload deve ter menos de 200 caracteres',
  })
  @ApiProperty({
    type: String,
    description: 'logs payload',
  })
  id: string;

  @IsNotEmpty({
    message: 'Informe o payload do log.',
  })
  @MaxLength(200, {
    message: 'O payload deve ter menos de 200 caracteres',
  })
  @ApiProperty({
    type: String,
    description: 'logs payload',
  })
  payload: string;

  @IsNotEmpty({
    message: 'Informe a ação do log.',
  })
  @ApiProperty({
    type: String,
    description: 'action of log',
  })
  action: string;

  @IsNotEmpty({
    message: 'Informe o timestamp.',
  })
  @ApiProperty({
    type: Date,
    description: 'timestamp',
  })
  timestamp: Date;
}
