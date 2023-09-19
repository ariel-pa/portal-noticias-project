import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateNoticiaDto } from 'src/noticias/dto/create-noticia.dto';
import { ArchivosService } from './archivos.service';
import { archivoFilter, archivoNombre } from './helpers/archivoFilter';

@Controller('archivos')
export class ArchivosController {
  constructor(private readonly archivosService: ArchivosService) {}

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
    console.log(archivo);
    return { fileName: archivo.originalname };
  }
}
