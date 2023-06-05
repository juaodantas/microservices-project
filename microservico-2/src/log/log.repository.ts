import { EntityRepository, Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';

@EntityRepository(Log)
export class LogRepository extends Repository<Log> {
  /**
   * Metodo responsavel por criar um Log
   * @param createLogDto
   * @returns Log Entity
   */
  async createLog(createLogDto: CreateLogDto): Promise<Log> {
    const log: Log = this.create();

    log.action = createLogDto.action;
    log.payload = createLogDto.payload;
    log.timestamp = createLogDto.timestamp;

    await log.save();
    return log;
  }

  /**
   * Metodo responsavel por retornar todos os logs cadastrados
   * @returns Log[]
   */
  async findAllList(): Promise<Log[]> {
    return this.find();
  }

  /**
   * Metodo responsavel por retornar os dados de um log por Id
   * @param logId string
   * @returns Log
   */
  async findOneLog(logId: string): Promise<Log> {
    return this.findOne({
      where: { id: logId },
    });
  }
}
