import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Readable } from 'stream';

@Injectable()
export class FirebaseStorageService {
  constructor() {}
  private bucket = admin.storage().bucket();
  private storage = admin.storage();

  async uploadImage(file: any, path: string): Promise<string> {
    try {
      console.log(file);
      const fileStream = new Readable();
      fileStream.on('data', (chunk) => {
        // Se ejecutará cada vez que haya datos
        console.log('Recibidos datos: ', chunk);
      });
      fileStream.on('data', (chunk) => {
        console.log('Recibidos datos: ', chunk);
      });

      fileStream.on('end', () => {
        console.log('Fin del flujo');
      });

      if (file.buffer) {
        console.log('Tamaño del buffer:', file.buffer.length);
    } else {
        console.log('No se ha recibido un buffer.');
    }
    
      fileStream.push(file.buffer); // Comprueba si file.buffer es un buffer válido
      fileStream.push(null);

      fileStream.on('end', () => {
        // Se ejecutará cuando se haya terminado de leer el flujo
        console.log('Fin del flujo');
      });
      fileStream.push(file.buffer);
      fileStream.push(null);

      const fileUpload = this.bucket.file(path);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
      fileStream.pipe(stream);

      await new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', resolve);
      });

      console.log(`Imagen subida exitosamente a ${path}`);
      return path;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      return null;
    }
  }

  async getDownloadUrl(destinationPath: string) {
    const file = this.storage.bucket().file(destinationPath);

    const expires = Date.now() + 60 * 60 * 1000; // 1 hour
    const options = {
      action: 'read' as const,
      expires,
    };

    try {
      const data = await file.getSignedUrl(options);
      return data;
    } catch (error) {
      console.error('Error al obtener la URL firmada:', error);
      return null;
    }
  }
}
