import { Noticia } from 'src/noticias/entities/noticia.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'categorias' })
export class Categoria {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ default: '' })
  nombre: string;

  @Column({ default: '' })
  abreviatura: string;

  @JoinTable()
  @OneToMany(() => Noticia, (noticia) => noticia.categoria)
  noticias: Noticia[];
}
