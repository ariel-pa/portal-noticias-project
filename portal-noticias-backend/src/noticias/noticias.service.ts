import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Departamento } from 'src/departamentos/entities/departamento.entity';
import { Repository } from 'typeorm';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { Noticia } from './entities/noticia.entity';
import fs from 'fs';

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticia)
    private noticiaRepository: Repository<Noticia>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
  ) {}

  public async mostrarImagenNoticia(imagenNombre: string) {
    const path = join(__dirname, './../../static/noticias', imagenNombre);
    if (!existsSync(path))
      throw new NotFoundException(
        `Imagen del producto no encontrado ${imagenNombre}`,
      );

    return readFileSync(path, { encoding: 'base64' });
  }

  public async crearNoticia(
    idCategoria: string,
    idDepartamento,
    body: Partial<Noticia>,
  ): Promise<Noticia> {
    const categoria = await this.categoriaRepository.findOneBy({
      id: idCategoria,
    });
    const departamento = await this.departamentoRepository.findOneBy({
      id: idDepartamento,
    });

    if (!categoria)
      throw new NotFoundException(
        `No se encontro lacategoria con id ${idCategoria}`,
      );

    if (!departamento)
      throw new NotFoundException(
        `No se encontro el departamento con id ${idDepartamento}`,
      );

    const noticia = this.noticiaRepository.create(body);
    noticia.categoria = categoria;
    noticia.departamento = departamento;
    return this.noticiaRepository.save(noticia);
  }

  public async listarNoticias(): Promise<Noticia[]> {
    return this.noticiaRepository.find();
  }

  public async listarUnaNoticiaPorId(id: string): Promise<Noticia> {
    const categoria = await this.noticiaRepository.findOneBy({ id });
    if (!categoria)
      throw new NotFoundException(`Noticia con id ${id} no encontrada.`);
    return categoria;
  }

  // public async actualizarNoticiaPorId(
  //   id: number,
  //   body: UpdateNoticiaDto,
  // ): Promise<Noticia> {
  //   const miCategoria = await this.listarUnaCategoriaPorId(id);
  //   if (!miCategoria)
  //     throw new NotFoundException(`Noticia con id ${id} no encontrada.`);
  //   miCategoria.nombre = body.nombre;
  //   miCategoria.abreviatura = body.abreviatura;
  //   return this.noticiaRepository.save(miCategoria);
  // }

  public async eliminarNoticia(id: number): Promise<void> {
    await this.noticiaRepository.delete(id);
  }
}
function base64_encode(arg0: string) {
  throw new Error('Function not implemented.');
}
