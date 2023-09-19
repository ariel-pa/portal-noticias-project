import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  public async crearCategoria(body: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaRepository.save(body);
  }

  public async listarCategorias(): Promise<Categoria[]> {
    return this.categoriaRepository.find({ relations: ['noticias'] });
  }

  public async listarUnaCategoriaPorId(id: string): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOneBy({ id });
    if (!categoria)
      throw new NotFoundException(`Categoria con id ${id} no encontrado.`);
    return categoria;
  }

  public async actualizarCategoriaPorId(
    id: string,
    body: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const miCategoria = await this.listarUnaCategoriaPorId(id);
    if (!miCategoria)
      throw new NotFoundException(`Categoria con id ${id} no encontrado.`);
    miCategoria.nombre = body.nombre;
    miCategoria.abreviatura = body.abreviatura;
    return this.categoriaRepository.save(miCategoria);
  }

  public async eliminarCategoria(id: string): Promise<void> {
    await this.categoriaRepository.delete(id);
  }
}
