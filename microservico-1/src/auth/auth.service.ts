import { UserRepository } from './../user/user.repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /**
   * Valida as informações do usario
   * @param username
   * @param password
   * @returns
   */
  async validateUser(username: string, password: string): Promise<any> {
    // implementar a lógica para verificar as credenciais do usuário
    // e retornar os detalhes do usuário caso sejam válidas.
    const user = await this.userService.findOneByName(username);
    if (user && user.senha === password) {
      // Remova a senha do objeto do usuário antes de retorná-lo.
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Login do usuario
   * @param user
   * @returns Access Token
   */
  async login(user: User) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
