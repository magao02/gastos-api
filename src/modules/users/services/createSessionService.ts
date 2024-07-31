import AppError from '@shared/errors/appError';
import { UsersRepository } from '../typeorm/repositories/usersRepository';
import User from '../typeorm/entities/user';
import auth from '@config/auth';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface loginDTO {
  email: string;
  password: string;
}

interface loginRes {
  user: User;
  token: string;
}

class createSessionService {
  private usersRepository = UsersRepository;

  async execute({ email, password }: loginDTO): Promise<loginRes> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('email not found', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    const token = sign({ role: user.role }, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default createSessionService;
