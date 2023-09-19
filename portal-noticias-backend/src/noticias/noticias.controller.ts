import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { archivoFilter, archivoNombre } from './helpers/archivoFilter';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('archivo', {
      fileFilter: archivoFilter,
      storage: diskStorage({
        destination: './static/noticias',
        filename: archivoNombre,
      }),
    }),
  )
  crearNoticia(
    @Body() body: CreateNoticiaDto,
    @UploadedFile() archivo: Express.Multer.File,
  ) {
    body.imagen = archivo.filename;
    return this.noticiasService.crearNoticia(
      body.categoriaId,
      body.departamentoId,
      body,
    );
  }

  @Get('imagen/:nombreImagen')
  async mostrarImagenNoticia(
    @Res() res: Response,
    @Param('nombreImagen') nombreImagen: string,
  ) {
    const path = await this.noticiasService.mostrarImagenNoticia(nombreImagen);
    res.send(path);
  }

  @Get()
  async listarNoticias() {
    return this.noticiasService.listarNoticias();
  }

  @Get(':id')
  listarUnaNoticiaPorId(@Param('id', ParseIntPipe) id: string) {
    return this.noticiasService.listarUnaNoticiaPorId(id);
  }

  @Put(':id')
  actualizarNoticiaPorId(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateNoticiaDto,
  ) {
    // return this.noticiasService.(id, body);
  }

  @Delete(':id')
  eliminarNoticia(@Param('id', ParseIntPipe) id: number) {
    // return this.noticiasService.eliminar.N(id);
  }
}
