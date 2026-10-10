import { Request, Response } from 'express';
import { OrderService } from '../service/orderservice';
import logger from '../lib/logger';

export class OrderController {
  private orderService = new OrderService();

  processOrder = async (req: Request, res: Response) => {
    try {
      const result = await this.orderService.processOrder(
        req.body
      );

      return res.json({
        message: 'Pedido processado com sucesso',
        orderId: result.orderId,
        emailPreview: result.emailPreview
      });

    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro desconhecido';

      logger.error(
        `Erro ao processar pedido: ${message}`
      );

      if (
        message === 'Carrinho vazio' ||
        message.includes('não encontrado') ||
        message === 'Método de pagamento não suportado'
      ) {
        return res.status(400).json({
          error: message
        });
      }

      return res.status(500).json({
        error: 'Erro interno'
      });
    }
  };
}