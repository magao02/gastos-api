import { Request, Response } from 'express';
import GetUsersService from '../services/getUsersService';
import GetUserService from '../services/getUserService';
import CadastrarUserService from '../services/cadastrarUserService';
import DeleteUserService from '../services/deleteUserService';
import UpdateUserService from '../services/updateUserService';

class UsersController {
  async index(req: Request, res: Response) {
    const getUsersService = new GetUsersService();
    const users = await getUsersService.execute();
    return res.json(users);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const getUserService = new GetUserService();
    const user = await getUserService.findById(id);

    return res.json(user);
  }

  async showByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const getUserService = new GetUserService();
    const user = await getUserService.findByEmail(email);

    return res.json(user);
  }

  async showByNome(req: Request, res: Response) {
    const { nome } = req.params;
    const getUserService = new GetUserService();
    const user = await getUserService.findByNome(nome);

    return res.json(user);
  }

  async create(req: Request, res: Response) {
    const { nome, email, password, role } = req.body;
    const cadastrarUserService = new CadastrarUserService();
    const user = await cadastrarUserService.execute({
      nome,
      email,
      password,
      role,
    });

    return res.status(201).json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute(id);

    return res.json({ message: 'User deleted successfully' });
  }

  async update(req: Request, res: Response) {
    const id = req.user.id;
    const { nome, email, password, old_password } = req.body;
    const updateUserService = new UpdateUserService();
    const user = await updateUserService.execute({
      id,
      nome,
      email,
      password,
      old_password,
    });

    return res.json(user);
  }
}

export default UsersController;
