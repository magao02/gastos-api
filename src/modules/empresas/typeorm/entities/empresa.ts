import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '@modules/users/typeorm/entities/user';
import Lancamento from '@modules/lancamentos/typeorm/entities/lancamento';
import Descricao from '@modules/lancamentos/typeorm/entities/descricao';

@Entity('Empresas')
class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  estado: string;

  @ManyToOne(() => User, user => user.empresas)
  usuario: User;

  @OneToMany(() => Lancamento, lancamento => lancamento.empresa, {
    nullable: true,
  })
  lancamentos: Lancamento[];

  @OneToMany(() => Descricao, descricao => descricao.empresa)
  descricoes: Descricao[];

  @Column({ default: true })
  isActive: boolean;
}

export default Empresa;
