import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFilmesGenerosTable1720186224185
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'filmes_generos',
        columns: [
          {
            name: 'filmesId',
            type: 'uuid',
          },
          {
            name: 'generosId',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'filmes_generos',
      new TableForeignKey({
        columnNames: ['filmesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Filmes',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'filmes_generos',
      new TableForeignKey({
        columnNames: ['generosId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Generos',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('filmes_generos');
  }
}
