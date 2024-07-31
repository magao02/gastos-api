import Filme from '../typeorm/entities/filme';
import { FilmesRepository } from '../typeorm/repositories/filmesRepository';

class GetFilmeService {
  private filmesRepository = FilmesRepository;

  async findById(id: string): Promise<Filme | null> {
    const filme = await this.filmesRepository.findOne({
      where: { id },
      relations: ['generos', 'atores'],
    });

    if (filme) {
      const mediaNotas = await this.filmesRepository.calcularMediaNotas(id);
      filme.mediaNotas = mediaNotas;
    }
    return filme;
  }

  async buscarFilmePorNome(nome: string): Promise<Filme | null> {
    const filme = this.filmesRepository.findByNome(nome);
    return filme;
  }
}

export default GetFilmeService;
