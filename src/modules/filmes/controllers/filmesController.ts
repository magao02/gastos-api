import { Request, Response } from 'express';
import DeleteFilmeService from '../services/deleteFilmeService';
import CadastrarFilmeService from '../services/cadastrarFilmeService';
import GetFilmesService from '../services/getFilmesService';
import GetFilmeService from '../services/getFilmeService';

class FilmesController {
  async index(req: Request, res: Response) {
    const getFilmesService = new GetFilmesService();
    const filmes = await getFilmesService.excute();

    return res.json(filmes);
  }

  async showByGenero(req: Request, res: Response) {
    const { genero } = req.params;
    const getFilmesService = new GetFilmesService();
    const filmes = await getFilmesService.buscarFilmesPorGenero(genero);

    return res.json(filmes);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const getFilmeService = new GetFilmeService();
    const filme = await getFilmeService.findById(id);

    return res.json(filme);
  }

  async showByname(req: Request, res: Response) {
    const { nome } = req.params;
    const getFilmeService = new GetFilmeService();
    const filme = await getFilmeService.buscarFilmePorNome(nome);

    return res.json(filme);
  }

  async create(req: Request, res: Response) {
    const {
      nome,
      diretor,
      generos,
      anoLancamento,
      atores,
      duracao,
      classificacao,
      sinopse,
    } = req.body;
    const capa = req.file?.filename;
    const cadastrarfilmesService = new CadastrarFilmeService();
    const filme = await cadastrarfilmesService.execute({
      nome,
      diretor,
      capa,
      generos,
      anoLancamento,
      atores,
      duracao,
      classificacao,
      sinopse,
    });

    return res.status(201).json(filme);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletefilmesService = new DeleteFilmeService();
    await deletefilmesService.execute(id);

    return res.json({ message: 'Filme deletado com sucesso' });
  }
}

export default FilmesController;
