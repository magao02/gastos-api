import { app } from './app';
import 'reflect-metadata';
import 'dotenv/config';
import { dataSource } from '@shared/typeorm';

dataSource.initialize().then(() => {
  const server = app.listen(8080, () => {
    console.log(`Server started on port  8080!`);
  });
});
