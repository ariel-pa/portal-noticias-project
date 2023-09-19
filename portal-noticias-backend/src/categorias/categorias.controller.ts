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
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  crearCategoria(@Body() body: CreateCategoriaDto) {
    return this.categoriasService.crearCategoria(body);
  }

  @Get()
  listarCategorias() {
    return this.categoriasService.listarCategorias();
  }

  @Get(':id')
  listarUnaCategoriaPorId(@Param('id', ParseIntPipe) id: string) {
    return this.categoriasService.listarUnaCategoriaPorId(id);
  }

  @Put(':id')
  actualizarCategoriaPorId(
    @Param('id', ParseIntPipe) id: string,
    @Body() body: UpdateCategoriaDto,
  ) {
    return this.categoriasService.actualizarCategoriaPorId(id, body);
    // return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  eliminarCategoria(@Param('id', ParseIntPipe) id: string) {
    return this.categoriasService.eliminarCategoria(id);
  }
}
