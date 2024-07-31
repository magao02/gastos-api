import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFilmesAtoresTable1720186557775
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'filmes_atores',
        columns: [
          {
            name: 'filmesId',
            type: 'uuid',
          },
          {
            name: 'atoresId',
            type: 'uuid',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'filmes_atores',
      new TableForeignKey({
        columnNames: ['filmesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Filmes',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'filmes_atores',
      new TableForeignKey({
        columnNames: ['atoresId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Atores',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('filmes_atores');
  }
}
