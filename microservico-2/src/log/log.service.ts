import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogRepository } from './log.repository';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogRepository) private logRepository: LogRepository,
  ) {}
  /**
   * Endpoint para criar um log
   * @param createLogDto
   * @returns Log
   */
  async create(createLogDto: CreateLogDto): Promise<Log> {
    return this.logRepository.createLog(createLogDto);
  }

  /**
   * Endpoint responsavel por retornar todos os logs
   * @returns Log[]
   */
  async findAll(): Promise<Log[]> {
    return this.logRepository.findAllList();
  }

  /**
   * Endpoint responsavel por retornar os dados de um log
   * @param id
   * @returns Log
   */
  async findOne(id: string): Promise<Log> {
    return this.logRepository.findOneLog(id);
  }

  /**
   * Metodo para receber os logs pelo kafka
   * e Cadastra no banco
   */
  async createByKafka(dataFromKafka: string) {
    const bracketIndex = dataFromKafka.indexOf('{');
    const createLog: CreateLogDto = {
      action: dataFromKafka.substring(0, bracketIndex).trim(),
      payload: dataFromKafka.substring(bracketIndex),
      timestamp: new Date(Date.now()),
    };
    await this.logRepository.createLog(createLog);
  }
}
