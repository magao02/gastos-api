/**
 * @swagger
 * components:
 *   schemas:
 *     Nota:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         valor:
 *           type: number
 *         filme:
 *           $ref: './modules/filmes/typeorm/entities/filme.ts#'
 *         usuario:
 *           $ref: './modules/users/typeorm/entities/user.ts#'
 */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Filme from '../../../filmes/typeorm/entities/filme';
import User from '@modules/users/typeorm/entities/user';

@Entity('Notas')
class Nota {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  valor: number;

  @ManyToOne(() => Filme, filme => filme.notas)
  filme: Filme;

  @ManyToOne(() => User, user => user.notas)
  usuario: User;
}

export default Nota;
