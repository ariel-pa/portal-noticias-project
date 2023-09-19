import { Module } from '@nestjs/common';
import { NoticiasModule } from './noticias/noticias.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { dbConfig } from './dbConfig';
import { ArchivosModule } from './archivos/archivos.module';

@Module({
  imports: [
    dbConfig,
    NoticiasModule,
    CategoriasModule,
    DepartamentosModule,
    ArchivosModule,
  ],
})
export class AppModule {}
