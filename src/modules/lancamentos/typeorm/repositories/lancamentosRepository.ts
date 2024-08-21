import { dataSource } from '@shared/typeorm';

import Lancamento from '../entities/lancamento';

export const LancamentoRepository = dataSource
  .getRepository(Lancamento)
  .extend({
    async findById(id: string): Promise<Lancamento | null> {
      const lancamento = this.findOne({
        where: { id },
        relations: ['empresa'],
      });
      return lancamento;
    },

    async findByEmpresaId(empresaId: string): Promise<Lancamento[]> {
      const lancamentos = this.find({
        where: { empresa: { id: empresaId } },
        relations: ['empresa', 'descricao'],
      });
      return lancamentos;
    },
  });
