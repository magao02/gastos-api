import RedisCache from '@shared/cache/RedisCache';
import Lancamento from '../typeorm/entities/lancamento';
import { DescricaoRepository } from '../typeorm/repositories/descricaoRepository';
import { LancamentoRepository } from '../typeorm/repositories/lancamentosRepository';
import GetEmpresaService from '@modules/empresas/services/getEmpresaService';
import AppError from '@shared/errors/appError';

interface ICreateLancamentoDTO {
  descricao: string;
  valor: number;
  data: Date;
  tipo: 'recebimento' | 'despesa';
  empresaId: string;
  comprovante?: string;
  banco: string;
}
class CreateLancamentoService {
  public async execute(data: ICreateLancamentoDTO): Promise<Lancamento> {
    const lancamentosRepository = LancamentoRepository;
    const descricaoRepository = DescricaoRepository;
    const getEmpresaService = new GetEmpresaService();
    const redisCache = new RedisCache();
    const empresa = await getEmpresaService.executeExists(data.empresaId);

    if (!empresa) {
      throw new AppError('Empresa not found', 404);
    }
    const dateString = data.data; // "2024-08-24T00:00:00.000Z"
    const localDate = new Date(dateString);
    const formattedDate = localDate.toISOString().split('T')[0];

    let descricaoExists = await descricaoRepository.findByDescricaoAndEmpresaId(
      data.descricao,
      empresa.id,
    );

    if (!descricaoExists) {
      const descricao = descricaoRepository.create({
        descricao: data.descricao,
        empresa,
      });
      await descricaoRepository.save(descricao);
      descricaoExists = descricao;
    }

    const lancamento = lancamentosRepository.create({
      descricao: descricaoExists,
      valor: data.valor,
      data: formattedDate,
      tipo: data.tipo,
      comprovante: data.comprovante,
      banco: data.banco,
      empresa,
    });

    await lancamentosRepository.save(lancamento);

    redisCache.invalidate(`lancamentos-${data.empresaId}`);

    return lancamento;
  }
}

export default CreateLancamentoService;
