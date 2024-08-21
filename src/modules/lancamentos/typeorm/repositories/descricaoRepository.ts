import { dataSource } from '@shared/typeorm';

import Descricao from '../entities/descricao';

export const DescricaoRepository = dataSource.getRepository(Descricao).extend({
  async findById(id: string): Promise<Descricao | null> {
    const descricao = this.findOne({
      where: { id },
      relations: ['empresa'],
    });
    return descricao;
  },

  async findByEmpresaId(empresaId: string): Promise<Descricao[]> {
    const descricoes = this.find({
      where: { empresa: { id: empresaId } },
      relations: ['empresa'],
    });
    return descricoes;
  },

  async findByDescricaoAndEmpresaId(
    descricao: string,
    empresaId: string,
  ): Promise<Descricao | null> {
    const descricaoExists = this.findOne({
      where: { descricao, empresa: { id: empresaId } },
    });
    return descricaoExists;
  },
});
