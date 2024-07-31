import AppError from '@shared/errors/appError';
import { FilmesRepository } from '../typeorm/repositories/filmesRepository';

class DeleteFilmeService {
  private filmesRepository = FilmesRepository;

  async execute(id: string): Promise<void> {
    const filme = await this.filmesRepository.findOne({ where: { id } });
    if (!filme) {
      throw new AppError('Filme não encontrado');
    }
    await this.filmesRepository.remove(filme);
  }
}

export default DeleteFilmeService;
