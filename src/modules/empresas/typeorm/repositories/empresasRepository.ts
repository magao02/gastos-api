import { dataSource } from '@shared/typeorm';

import User from '@modules/users/typeorm/entities/user';
import Empresa from '../entities/empresa';

export const EmpresaRepository = dataSource.getRepository(Empresa).extend({
  async findById(id: string): Promise<Empresa | null> {
    const filme = this.findOne({ where: { id }, relations: ['usuario'] });
    return filme;
  },

  async findByUsuarioFilme(usuario: User): Promise<Empresa | null> {
    const nota = this.findOne({
      where: {
        usuario: usuario,
      },
    });
    return nota;
  },
});
export default EmpresaRepository;
