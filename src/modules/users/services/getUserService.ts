import AppError from '@shared/errors/appError';
import { UsersRepository } from '../typeorm/repositories/usersRepository';
import User from '../typeorm/entities/user';

class GetUserService {
  private usersRepository = UsersRepository;

  public async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  public async findByNome(nome: string): Promise<User> {
    const user = await this.usersRepository.findByNome(nome);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}

export default GetUserService;
