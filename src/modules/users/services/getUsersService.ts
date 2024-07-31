import User from '../typeorm/entities/user';
import { UsersRepository } from '../typeorm/repositories/usersRepository';

class GetUsersService {
  private usersRepository = UsersRepository;
  // Filtra apenas usuários ativos
  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: {
        isActive: true,
      },
    });

    return users;
  }
}

export default GetUsersService;
