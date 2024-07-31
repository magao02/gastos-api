import { dataSource } from '@shared/typeorm';
import Genero from '../entities/genero';

export const GenerosRepository = dataSource.getRepository(Genero).extend({
  async findByNome(nome: string): Promise<Genero | null> {
    const genero = this.findOne({ where: { nome } });
    return genero;
  },
});
