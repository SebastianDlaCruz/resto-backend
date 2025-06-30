import { Order } from '@modules/order/entity/order.entity';
import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class GeneratePdfService {

  private readonly assetsPath = path.join(__dirname, '..', '..', 'public', 'assets');

  generate(order: Order): Promise<Buffer> {

    return new Promise((resolve, reject) => {

      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      doc.info.Title = `Order #${order.uuid}`;
      doc.info.Author = 'Resto App';

      doc.on('error', (err) => {
        reject(new Error(`Error al generar el pdf ${err}`));
      })

      doc.on('data', buffers.push.bind(buffers));

      doc.on('end', () => resolve(Buffer.concat(buffers)));

      doc.fillColor('#0e0e0e').strokeColor('#0e0e0e');

      doc.image(this.assetsPath, 100, 20, { width: 100 });
      doc.fontSize(15).text(`Order #${order.uuid}`, 100, 50, { align: 'center' });

      doc.fillColor('#fff').fontSize(16).text('Datos del usuario:').moveDown(0.2);

      doc.fillColor('#fff').fontSize(16).text(`Nombre: ${order.user.username}`).moveDown(0.2);
      doc.fillColor('#fff').fontSize(16).text(`Dirección: ${order.user.address}`).moveDown(0.2);
      doc.fillColor('#fff').fontSize(16).text(`Número: ${order.user.number}`).moveDown(0.2);
      doc.fillColor('#fff').fontSize(16).text(`Piso: ${order.user.floor}`).moveDown(0.2);
      doc.fillColor('#fff').fontSize(16).text(`Contacto: ${order.user.contact}`).moveDown(0.2);
      doc.fillColor('#fff').fontSize(16).text(`Código postal: ${order.user.postal_code}`).moveDown(0.2);

      doc.fillColor('#fff').fontSize(16).text('Productos:')

      order.cart.items.forEach(item => {
        doc.fillColor('#fff').text(`platillo: ${item.dish.name} C/A ${item.dish.price} - precio total: ${item.total} X${item.count}`).moveDown(0.2);
      });


      doc.fillColor('#fff').fontSize(16).text(`Total: ${order.cart.total}`).moveDown(0.2);

      doc.end();
    })
  }



}
