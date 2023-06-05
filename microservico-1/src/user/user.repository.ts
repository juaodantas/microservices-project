import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Metodo responsavel pela criação do usuario
   * @param createUserDto
   * @returns User
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.create();

    user.name = createUserDto.name;
    user.senha = createUserDto.senha;
    user.email = createUserDto.email;
    user.cargo = createUserDto.cargo;

    await user.save();
    return user;
  }

  /**
   *
   * Metodo responsavel por retornar todos os usuarios cadastrados
   * @returns User[]
   */
  async findAllList(): Promise<User[]> {
    return this.find();
  }

  /**
   * Metodo responsavel por retornar o usuario pelo id
   * @param userId string
   * @returns User
   */
  async findOneUser(userId: string): Promise<User> {
    return this.findOne({
      where: { id: userId },
    });
  }

  /**
   * Metodo responsavel por retornar o usario a partir do seu nome
   * @param userName string
   * @returns User
   */
  async findOneByName(userName: string): Promise<User> {
    return this.findOne({
      where: { name: userName },
    });
  }
}
