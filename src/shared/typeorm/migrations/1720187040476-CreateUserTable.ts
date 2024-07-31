import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1720187040476 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true, // Adiciona uma restrição de unicidade para o email
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'varchar',
            default: 'user',
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
