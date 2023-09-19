import { Module } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticia } from './entities/noticia.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Departamento } from 'src/departamentos/entities/departamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Noticia, Categoria, Departamento])],
  controllers: [NoticiasController],
  providers: [NoticiasService],
})
export class NoticiasModule {}
