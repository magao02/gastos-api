import User from '@modules/users/typeorm/entities/user';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcryptjs';
export class InsertUserAdmin1720188774044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();
    user.nome = 'admin';
    user.email = 'admin@email.com';
    user.password = await hash('senha123', 8); // Hash da senha usando bcrypt
    user.role = 'admin'; // Defina o papel do usuário, se aplicável
    user.isActive = true; // Defina se o usuário está ativo
    await queryRunner.manager.save(User, user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, { email: 'admin@email.com' });
  }
}
