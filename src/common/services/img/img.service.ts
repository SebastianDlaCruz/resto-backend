import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class ImgService {

  constructor(private readonly configService: ConfigService) { }

  async updateLoadImg(file: Express.Multer.File) {

    /* 
        try {
          const response = await fetch(`https://api.imgbb.com/1/upload?key=${this.configService.get('KEY_API_IMG')}&image=${base64}`);
    
          return response;
    
        } catch {
          throw new InternalServerErrorException('Error al cargar la imagen')
        } */
  }

}
