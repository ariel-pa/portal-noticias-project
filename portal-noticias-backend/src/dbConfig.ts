import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Categoria } from './categorias/entities/categoria.entity';
import { Departamento } from './departamentos/entities/departamento.entity';
import { Noticia } from './noticias/entities/noticia.entity';

config();
export const dbConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Categoria, Departamento, Noticia],
  synchronize: true,
});
