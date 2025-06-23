import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ImgData } from './model/img.model';



@Injectable()
export class ImgService {

  constructor(private readonly configService: ConfigService) { }


  async updateLoadImg(file: Express.Multer.File) {

    const base64 = file.buffer.toString('base64');
    const formData = new FormData();

    formData.append('image', base64);

    try {

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${this.configService.get('KEY_API_IMG')}`, {
        method: 'POST',
        body: formData
      });


      const img = await response.json() as ImgData;

      return img.data.display_url;

    } catch {
      throw new InternalServerErrorException('Error al cargar la imagen')
    }
  }

}
