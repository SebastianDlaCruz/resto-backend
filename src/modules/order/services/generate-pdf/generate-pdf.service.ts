import { Order } from '@modules/order/entity/order.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as path from 'node:path';
import * as PDFDocument from 'pdfkit';



@Injectable()
export class GeneratePdfService {
  private readonly assetsPath = path.join(__dirname, '../../../../../public/assets');

  generate(order: Order): Promise<Buffer> {

    return new Promise((resolve, reject) => {

      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      doc.info.Title = `Order #${order.uuid}`;
      doc.info.Author = 'Resto App';

      doc.on('error', (err) => {
        reject(new InternalServerErrorException(`Error al generar el pdf ${err}`));
      })

      doc.on('data', (chunk) => buffers.push(chunk));

      doc.on('end', () => resolve(Buffer.concat(buffers)));

      doc.fillColor('#0e0e0e').strokeColor('#0e0e0e');


      doc.font('Helvetica-Bold').fontSize(18).text(`Order #${order.uuid}`, 100, 50,).moveDown(0.5);

      doc.fillColor('#0e0e0e').fontSize(16).text('Datos del usuario:').moveDown(0.2);


      doc.fillColor('#0e0e0e').fontSize(16).text(`Nombre: ${order.user.username}`).moveDown(0.2);
      doc.fillColor('#0e0e0e').fontSize(16).text(`Direccion: ${order.user.address ?? ''}`).moveDown(0.2);
      doc.fillColor('#0e0e0e').fontSize(16).text(`Numero: ${order.user.number ?? ''}`).moveDown(0.2);
      doc.fillColor('#0e0e0e').fontSize(16).text(`Contacto: ${order.user.contact ?? ''}`).moveDown(0.2);


      const dataDish = order.cart.items.map(item => {
        return [`${item.dish.name}`, `${item.dish.price}`, `${item.total}`, `${item.count}`]
      });


      doc.font('Helvetica-Bold').fillColor('#0e0e0e').fontSize(18).text('Detalles del pedido:').moveDown(0.2);

      doc.table({
        rowStyles: (i) => {
          return i < 1
            ? { border: [0, 0, 2, 0], borderColor: "black" }
            : { border: [0, 0, 1, 0], borderColor: "#aaa" };
        },
        data: [
          ["Nombre", "Precio", "Total", 'Cantidad'],
          ...dataDish
        ],
      });

      doc.font('Helvetica-Bold').fontSize(18).text(`Total: ${order.cart.total}`).moveDown(0.5);

      doc.end();
    })
  }
}
