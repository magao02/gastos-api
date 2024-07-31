import AppError from '@shared/errors/appError';
import CadastrarFilmeService from '../cadastrarFilmeService';

describe('CadastrarFilmeService', () => {
  it('should be able to create a new movie', async () => {
    const cadastrarFilmeService = new CadastrarFilmeService();

    const filme = await cadastrarFilmeService.execute({
      nome: 'Filme Teste',
      diretor: 'Diretor Teste',
      capa: 'capa.jpg',
      generos: ['Ação', 'Aventura'],
      anoLancamento: 2021,
      atores: ['Ator 1', 'Ator 2'],
      duracao: 120,
      classificacao: 16,
      sinopse: 'Sinopse do filme',
    });

    expect(filme).toHaveProperty('id');
  });

  it('should not be able to create a new movie with the same name', async () => {
    const cadastrarFilmeService = new CadastrarFilmeService();

    await cadastrarFilmeService.execute({
      nome: 'Filme Teste',
      diretor: 'Diretor Teste',
      capa: 'capa.jpg',
      generos: ['Ação', 'Aventura'],
      anoLancamento: 2021,
      atores: ['Ator 1', 'Ator 2'],
      duracao: 120,
      classificacao: 16,
      sinopse: 'Sinopse do filme',
    });

    await expect(
      cadastrarFilmeService.execute({
        nome: 'Filme Teste',
        diretor: 'Diretor Teste',
        capa: 'capa.jpg',
        generos: ['Ação', 'Aventura'],
        anoLancamento: 2021,
        atores: ['Ator 1', 'Ator 2'],
        duracao: 120,
        classificacao: 16,
        sinopse: 'Sinopse do filme',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
