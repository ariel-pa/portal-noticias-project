import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  crearDepartamento(@Body() body: CreateDepartamentoDto) {
    return this.departamentosService.crearDepartamento(body);
  }

  @Get()
  listarDepartamentos() {
    return this.departamentosService.listarDepartamentos();
  }

  @Get(':id')
  listarUnDepartamentoPorId(@Param('id', ParseIntPipe) id: string) {
    return this.departamentosService.listarUnDepartamentoPorId(id);
  }

  @Put(':id')
  actualizarDepartamentoPorId(
    @Param('id', ParseIntPipe) id: string,
    @Body() body: UpdateDepartamentoDto,
  ) {
    return this.departamentosService.actualizarDepartamentoPorId(id, body);
  }

  @Delete(':id')
  eliminarDepartamento(@Param('id', ParseIntPipe) id: string) {
    return this.departamentosService.eliminarDepartamento(id);
  }
}
