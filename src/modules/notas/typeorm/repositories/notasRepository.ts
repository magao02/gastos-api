import { dataSource } from '@shared/typeorm';
import Nota from '../entities/nota';
import User from '@modules/users/typeorm/entities/user';
import Filme from '@modules/filmes/typeorm/entities/filme';

export const NotasRepository = dataSource.getRepository(Nota).extend({
  async findById(id: string): Promise<Nota | null> {
    const filme = this.findOne({ where: { id } });
    return filme;
  },

  async findByUsuarioFilme(usuario: User, filme: Filme): Promise<Nota | null> {
    const nota = this.findOne({
      where: {
        filme: filme,
        usuario: usuario,
      },
    });
    return nota;
  },
});
