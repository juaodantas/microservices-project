import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Informe o nome do usuario.',
  })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  @ApiProperty({
    type: String,
    description: 'name of user',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe o senha do usuario.',
  })
  @MaxLength(20, {
    message: 'O senha deve ter menos de 20 caracteres',
  })
  @ApiProperty({
    type: String,
    description: 'password of user',
  })
  senha: string;

  @IsNotEmpty({
    message: 'Informe o email do usuario.',
  })
  @ApiProperty({
    type: String,
    description: 'email of user',
  })
  email: string;

  @IsNotEmpty({
    message: 'Informe o cargo do usuario.',
  })
  @ApiProperty({
    type: String,
    description: 'post of user',
  })
  cargo: string;
}
