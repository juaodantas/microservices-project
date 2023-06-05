import { ApiProperty } from '@nestjs/swagger';

export class UserResponseSwagger {
  @ApiProperty({
    type: String,
    description: 'name of user',
  })
  name: string;
}
