import { v4 as uuid } from 'uuid';
export const archivoFilter = (
  req: Express.Request,
  archivo: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => any,
) => {
  if (!archivo) return callback(new Error('Archivo esta vacio'), false);

  const archivoExtencion = archivo.mimetype.split('/')[1];
  const extencionesValidas = ['jpg', 'png', 'jpeg'];

  if (extencionesValidas.includes(archivoExtencion)) {
    return callback(null, true);
  }

  callback(null, false);
};

export const archivoNombre = (
  req: Express.Request,
  archivo: Express.Multer.File,
  callback: (error: Error, acceptFile) => any,
) => {
  if (!archivo) return callback(new Error('Archivo esta vacio'), false);

  const archivoExtencion = archivo.mimetype.split('/')[1];
  const archivoNombre = `${uuid()}.${archivoExtencion}`;

  callback(null, archivoNombre);
};
