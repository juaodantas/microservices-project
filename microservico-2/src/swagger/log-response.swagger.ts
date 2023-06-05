import { ApiProperty } from '@nestjs/swagger';

export class LogResponseSwagger {
  @ApiProperty({
    type: String,
    description: 'action of log',
  })
  name: string;
}
