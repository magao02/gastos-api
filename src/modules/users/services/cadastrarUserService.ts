import AppError from '@shared/errors/appError';
import { UsersRepository } from '../typeorm/repositories/usersRepository';
import User from '../typeorm/entities/user';
import { hash } from 'bcryptjs';
enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
interface UserDTO {
  nome: string;
  email: string;
  password: string;
  role: Role;
}
class CadastrarUserService {
  private usersRepository = UsersRepository;

  public async execute({
    nome,
    email,
    password,
    role,
  }: UserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }
    const hashedPassword = await hash(password, 8);
    const user = this.usersRepository.create({
      nome,
      email,
      role,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export default CadastrarUserService;
