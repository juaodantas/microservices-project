import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserListItem } from './dto/user-listitem.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { UserResponseSwagger } from 'src/swagger/user-response.swagger';
import { BadRequestSwagger } from 'src/swagger/bad-request.swagger';
import { NotFoundSwagger } from 'src/swagger/not-found.swagger';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Endpoint responsavel pela criação do usuario
   * @param createUserDto
   * @returns UserListItem
   */
  @Post()
  @ApiOperation({ summary: 'Adicionar um novo usuario' })
  @ApiCreatedResponse({
    type: UserResponseSwagger,
    description: 'Novo usuario criado com sucesso.',
  })
  @ApiBadRequestResponse({
    type: BadRequestSwagger,
    description: 'Parâmetros inválidos.',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserListItem> {
    try {
      const user: User = await this.userService.create(createUserDto);
      return UserMapper.toUserItem(user);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Endpoint responsavel por retornar todos os usuarios cadastrados
   * @returns UserListItem[]
   */
  @Get()
  @ApiOperation({ summary: 'Lista todos os usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios retornada com sucesso.',
  })
  async findAll(): Promise<UserListItem[]> {
    const user: User[] = await this.userService.findAll();
    return UserMapper.toUserListItem(user);
  }

  /**
   * Endpoint responsavel por retornar os dados de um usuario por Id
   * @param id
   * @returns UserListItem
   */
  @Get(':id')
  @ApiOperation({ summary: 'Exibe os dados de um usuario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios retornada com sucesso.',
  })
  async findOne(@Param('id') id: string): Promise<UserListItem> {
    const user: User = await this.userService.findOne(id);
    return UserMapper.toUserItem(user);
  }

  /**
   * Endpoint responsavel por atualizar o usuario
   * @param id
   * @param updateUserDto
   * @returns UserListItem
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar os dados de um usuario' })
  @ApiOkResponse({
    type: UserResponseSwagger,
    description: 'Dados de um usuario atualizado com sucesso.',
  })
  @ApiNotFoundResponse({
    type: NotFoundSwagger,
    description: 'Dados inválidos.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserListItem> {
    const user = await this.userService.update(id, updateUserDto);
    return UserMapper.toUserItem(user);
  }

  /**
   * Endpoint responsavel pela remoção do usuario
   * @param userId string
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um usuario' })
  @ApiResponse({ status: 204, description: 'Usuario removido com sucesso!' })
  @ApiResponse({
    status: 404,
    description: 'Usuario não foi encontrado',
    type: NotFoundSwagger,
  })
  remove(@Param('id') userId: string): Promise<void> {
    return this.userService.remove(userId);
  }
}
