export class CreateNoticiaDto {
  titulo: string;
  imagen: string;
  descripcion: string;
  fechaCreacion: Date;
  autor: string;
  banner: boolean;
  categoriaId: string;
  departamentoId: string;
}
