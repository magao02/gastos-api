import GetUserService from '@modules/users/services/getUserService';
import Nota from '../typeorm/entities/nota';
import { NotasRepository } from '../typeorm/repositories/notasRepository';
import AppError from '@shared/errors/appError';
import GetFilmeService from '@modules/filmes/services/getFilmeService';

interface CreateNotaDTO {
  filmeId: string;
  nota: number;
  usuario: string;
}
class CreateNotasService {
  async execute({ usuario, filmeId, nota }: CreateNotaDTO): Promise<Nota> {
    const notasRepository = NotasRepository;
    const getUserService = new GetUserService();
    const getFilmeService = new GetFilmeService();

    const user = await getUserService.findById(usuario);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const filme = await getFilmeService.findById(filmeId);

    if (!filme) {
      throw new AppError('Filme não encontrado');
    }

    const notaJaExiste = await notasRepository.findByUsuarioFilme(user, filme);

    if (notaJaExiste) {
      throw new AppError('Nota já cadastrada');
    }

    const notaDTO = {
      usuario: user,
      filme: filme,
      valor: nota,
    };

    const notaCriada = notasRepository.create(notaDTO);
    await notasRepository.save(notaCriada);

    return notaCriada;
  }
}

export default CreateNotasService;
