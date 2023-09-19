import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
  ) {}

  public async crearDepartamento(
    body: CreateDepartamentoDto,
  ): Promise<Departamento> {
    return this.departamentoRepository.save(body);
  }

  public async listarDepartamentos(): Promise<Departamento[]> {
    return this.departamentoRepository.find({ relations: ['noticias'] });
  }

  public async listarUnDepartamentoPorId(id: string): Promise<Departamento> {
    const departamento = await this.departamentoRepository.findOneBy({ id });
    if (!departamento)
      throw new NotFoundException(`Departamento con id ${id} no encontrado.`);
    return departamento;
  }

  public async actualizarDepartamentoPorId(
    id: string,
    body: UpdateDepartamentoDto,
  ): Promise<Departamento> {
    const miDepartamento = await this.listarUnDepartamentoPorId(id);
    if (!miDepartamento)
      throw new NotFoundException(`Departamento con id ${id} no encontrado.`);
    miDepartamento.nombre = body.nombre;
    miDepartamento.abreviatura = body.abreviatura;
    return this.departamentoRepository.save(miDepartamento);
  }

  public async eliminarDepartamento(id: string): Promise<void> {
    await this.departamentoRepository.delete(id);
  }
}
