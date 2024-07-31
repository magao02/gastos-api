import Empresa from '@modules/empresas/typeorm/entities/empresa';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Empresa, empresa => empresa.usuario, { nullable: true })
  empresas: Empresa[];

  @Column({ default: true })
  isActive: boolean;
}

export default User;
