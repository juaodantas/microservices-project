import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @Inject('KAFKA_CLIENT')
    private readonly kafkaClient: ClientKafka,
  ) {}

  /**
   * Metodo para criação de usuario
   * @param createUserDto
   * @returns User
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.createUser(createUserDto);
    await this.sendUserMessage(
      'user-topic',
      'User Create ' + JSON.stringify(createUserDto),
    );
    return user;
  }

  /**
   * Retorna uma lista de Usuarios
   * @returns User[]
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.findAllList();
  }

  /**
   * Retorna as informações de usuario por id
   * @param id id do usuario
   * @returns User
   */
  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  /**
   * Retorna as informações do usario pelo nome
   * @param name
   * @returns User
   */
  findOneByName(name: string): Promise<User> {
    return this.userRepository.findOneByName(name);
  }

  /**
   * Metodo para atualizar o usuario
   * @param id
   * @param updateUserDto
   * @returns User
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user: User = await this.userRepository.findOneOrFail(id);

      this.userRepository.merge(user, updateUserDto);
      await this.userRepository.save(user);
      await this.sendUserMessage(
        'user-topic',
        'User Update ' + JSON.stringify(updateUserDto),
      );

      return user;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Remove o Usuario pelo Id
   * @param id
   */
  async remove(id: string) {
    try {
      const result: User = await this.userRepository.findOneOrFail(id);
      if (!result) {
        throw new NotFoundException(
          'O usuario que você deseja remover não existe!',
        );
      }
      await this.userRepository.softDelete(id);
      await this.sendUserMessage('user-topic', 'User Delete {Payload Vazio}');
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Metodo para enviar logs para o Microservico II
   */
  async sendUserMessage(topic: string, message: string) {
    try {
      this.kafkaClient.emit(topic, message);
    } catch (error) {
      console.error('Erro ao enviar mensagem para o Kafka:', error);
    }
  }
}
