import Lancamento from '../typeorm/entities/lancamento';
import { LancamentoRepository } from '../typeorm/repositories/lancamentosRepository';
import GetEmpresaService from '@modules/empresas/services/getEmpresaService';
import AppError from '@shared/errors/appError';

interface ICreateLancamentoDTO {
  descricao: string;
  valor: number;
  data: Date;
  tipo: 'receita' | 'despesa';
  empresaId: string;
  comprovante?: string;
}
class CreateLancamentoService {
  public async execute(data: ICreateLancamentoDTO): Promise<Lancamento> {
    const lancamentosRepository = LancamentoRepository;
    const getEmpresaService = new GetEmpresaService();
    const empresa = await getEmpresaService.executeExists(data.empresaId);

    if (!empresa) {
      throw new AppError('Empresa not found', 404);
    }
    const dateString = data.data; // "2024-08-24T00:00:00.000Z"
    const localDate = new Date(dateString);
    const formattedDate = localDate.toISOString().split('T')[0];

    const lancamento = lancamentosRepository.create({
      descricao: data.descricao,
      valor: data.valor,
      data: formattedDate,
      tipo: data.tipo,
      comprovante: data.comprovante,
      empresa,
    });

    await lancamentosRepository.save(lancamento);

    return lancamento;
  }
}

export default CreateLancamentoService;
