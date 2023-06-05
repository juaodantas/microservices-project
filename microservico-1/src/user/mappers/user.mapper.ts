import { UserListItem } from '../dto/user-listitem.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  /**
   * This method transform User in UserListItem
   * @param user
   * @returns UserListItem
   */
  static async toUserItem(user: User): Promise<UserListItem> {
    return {
      id: user.id,
      name: user.name,
      senha: user.senha,
      cargo: user.cargo,
      email: user.email,
    };
  }

  /**
   * This method transform User in UserListItem
   * @param userList
   * @returns UserListItem
   */
  static async toUserListItem(userList: User[]): Promise<UserListItem[]> {
    let userListItem: UserListItem[] = [];

    userListItem = userList.map(
      (userMapper) =>
        <UserListItem>{
          id: userMapper.id,
          name: userMapper.name,
          senha: userMapper.senha,
          cargo: userMapper.cargo,
          email: userMapper.email,
        },
    );

    return userListItem;
  }
}
