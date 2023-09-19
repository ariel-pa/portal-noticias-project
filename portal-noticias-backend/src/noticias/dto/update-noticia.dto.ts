import { PartialType } from '@nestjs/mapped-types';
import { CreateNoticiaDto } from './create-noticia.dto';

export class UpdateNoticiaDto extends PartialType(CreateNoticiaDto) {
  titulo: string;
  imagen: string;
  descripcion: string;
  fechaCreacion: Date;
  autor: string;
  banner: boolean;
  categoriaId: string;
  departamentoId: string;
}
