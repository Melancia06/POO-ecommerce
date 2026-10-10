
import { getMailClient } from '../lib/mail';
import nodemailer from 'nodemailer';
import logger from '../lib/logger';

export class NotificationService {
  async sendOrderConfirmation(
    customer: string,
    orderId: number,
    totalAmount: number,
    productsDetails: any[]
  ) {
    const mailer = await getMailClient();

    const info = await mailer.sendMail({
      from: '"DevStore" <noreply@devstore.com>',
      to: customer,
      subject: `Confirmação do Pedido #${orderId}`,
      text: `Olá, seu pedido #${orderId} no valor de R$ ${totalAmount} foi confirmado.`,
      html: `
        <h1>Pedido Confirmado!</h1>
        <p>Olá, seu pedido <b>#${orderId}</b> foi processado com sucesso.</p>
        <p>Total: <strong>R$ ${totalAmount}</strong></p>
        <ul>
          ${productsDetails.map(p => `<li>${p.name}</li>`).join('')}
        </ul>
      `,
    });

    const emailPreview = nodemailer.getTestMessageUrl(info);

    logger.info(`Email enviado: ${emailPreview}`);

    return emailPreview;
  }
}
