import { dataSource } from '@shared/typeorm';
import Ator from '../entities/ator';

export const AtoresRepository = dataSource.getRepository(Ator).extend({
  async findByNome(nome: string): Promise<Ator | null> {
    const ator = this.findOne({ where: { nome } });
    return ator;
  },
});
