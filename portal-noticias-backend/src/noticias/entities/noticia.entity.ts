import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Departamento } from 'src/departamentos/entities/departamento.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'noticias' })
export class Noticia {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ default: '' })
  titulo: string;

  @Column({ default: '' })
  imagen: string;

  @Column({ default: '' })
  autor: string;

  @Column({ default: '' })
  descripcion: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @Column({ default: false })
  banner: boolean;

  @JoinTable()
  @ManyToOne(() => Categoria, (categoria) => categoria.noticias, {
    cascade: true,
    eager: true,
  })
  categoria: Categoria;

  @JoinTable()
  @ManyToOne(() => Departamento, (departamento) => departamento.noticias, {
    cascade: true,
    eager: true,
  })
  departamento: Departamento;
}
