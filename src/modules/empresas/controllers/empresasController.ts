import { Request, Response } from 'express';
import GetEmpresaService from '../services/getEmpresaService';
import GetEmpresasService from '../services/getEmpresasService';
import CreateEmpresaService from '../services/createEmpresaService';
import UpdateEmpresaService from '../services/UpdateEmpresaService';

class EmpresasController {
  async index(req: Request, res: Response) {
    const getEmpresaService = new GetEmpresasService();
    const empresas = await getEmpresaService.execute();
    return res.json(empresas);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const usuario = req.user.id;
    const role = req.user.role;
    const getEmpresaService = new GetEmpresaService();
    const empresa = await getEmpresaService.execute(id, usuario, role);
    return res.json(empresa);
  }

  async create(req: Request, res: Response) {
    const { nome, cnpj, usuario, estado } = req.body;
    const createEmpresaService = new CreateEmpresaService();
    const empresa = await createEmpresaService.execute({
      nome,
      cnpj,
      usuario,
      estado,
    });
    return res.json(empresa);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, cnpj, usuario, estado } = req.body;
    const updateEmpresa = new UpdateEmpresaService();
    const empresa = await updateEmpresa.execute({
      id,
      nome,
      cnpj,
      usuario,
      estado,
    });
    return res.json(empresa);
  }
}

export default EmpresasController;
