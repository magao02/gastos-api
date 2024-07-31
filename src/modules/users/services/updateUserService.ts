import { compare, hash } from 'bcryptjs';
import User from '../typeorm/entities/user';
import { UsersRepository } from '../typeorm/repositories/usersRepository';
import AppError from '@shared/errors/appError';
interface IUpdateUserDTO {
  id: string;
  nome: string;
  email: string;
  password?: string;
  old_password?: string;
}
class UpdateUserService {
  public async execute({
    id,
    nome,
    email,
    password,
    old_password,
  }: IUpdateUserDTO): Promise<User> {
    const usersRepository = UsersRepository;

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('usuario não encontrado');
    }

    const userWithUpdatedEmail = await usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
      throw new AppError('email já está em uso.');
    }

    if (password && !old_password) {
      throw new AppError('A senha antiga e obrigatoria.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('a senha atual esta incorreta.');
      }

      user.password = await hash(password, 8);
    }

    user.nome = nome;
    user.email = email;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
