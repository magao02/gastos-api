import { dataSource } from '@shared/typeorm';
import User from '../entities/user';

export const UsersRepository = dataSource.getRepository(User).extend({
  async findByNome(nome: string): Promise<User | null> {
    const filme = this.findOne({ where: { nome } });
    return filme;
  },

  async findByEmail(email: string): Promise<User | null> {
    const user = this.findOne({ where: { email }, relations: ['empresas'] });
    return user;
  },

  async findById(id: string): Promise<User | null> {
    const user = this.findOne({ where: { id } });
    return user;
  },

  async softDelete(id: string): Promise<void> {
    await this.update(id, {
      isActive: false,
    });
  },
});
