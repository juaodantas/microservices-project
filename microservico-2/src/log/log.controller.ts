import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { LogResponseSwagger } from 'src/swagger/log-response.swagger';
import { BadRequestSwagger } from 'src/swagger/bad-request.swagger';
import { NotFoundSwagger } from 'src/swagger/not-found.swagger';
import { LogListItemDto } from './dto/log-list-item.dto';
import { Log } from './entities/log.entity';
import { LogMapper } from './mapper/log.mapper';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  /**
   * Endpoint responsavel por criar um log
   * @param createLogDto
   * @returns LogListItemDto
   */
  @Post()
  @ApiOperation({ summary: 'Adicionar um novo log' })
  @ApiCreatedResponse({
    type: LogResponseSwagger,
    description: 'Novo log criado com sucesso.',
  })
  @ApiBadRequestResponse({
    type: BadRequestSwagger,
    description: 'Parâmetros inválidos.',
  })
  async create(@Body() createLogDto: CreateLogDto): Promise<LogListItemDto> {
    const log: Log = await this.logService.create(createLogDto);

    return LogMapper.toUserItem(log);
  }

  /**
   * Endpoint responsavel por retornar todos os logs cadastrados
   * @returns LogListItemDto[]
   */
  @Get()
  @ApiOperation({ summary: 'Lista todos os logs' })
  @ApiResponse({
    status: 200,
    description: 'Lista de logs retornada com sucesso.',
  })
  async findAll(): Promise<LogListItemDto[]> {
    const log: Log[] = await this.logService.findAll();

    return LogMapper.toUserListItem(log);
  }

  /**
   * Endpoint responsavel por retornar os dados de um log
   * @param id
   * @returns LogListItemDto
   */
  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de um log pelo id' })
  @ApiOkResponse({
    type: LogResponseSwagger,
    description: 'Dados de um log retornados com sucesso.',
  })
  @ApiNotFoundResponse({
    type: NotFoundSwagger,
    description: 'Log não foi encontrado.',
  })
  async findOne(@Param('id') id: string): Promise<LogListItemDto> {
    const log: Log = await this.logService.findOne(id);

    return LogMapper.toUserItem(log);
  }

  /**
   * Consume os dados do kafka e cadastra os logs no Banco
   * @param dataFromKafka
   */
  @MessagePattern('user-topic', Transport.KAFKA)
  async consumerToSendData(@Payload() dataFromKafka: any) {
    try {
      await this.logService.createByKafka(dataFromKafka.value);
    } catch (error) {
      console.log(error);
    }
  }
}
