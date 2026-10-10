
import { OrderRepository } from '../repositories/orderRepository';
import { NotificationService } from './NotificationService';

export class OrderService {
  private orderRepository = new OrderRepository();
  private notificationService=new NotificationService();

async processOrder(data: any) {
    const {
      customer,
      items,
      paymentMethod,
      paymentDetails
    } = data;

    // 1. Validar o carrinho
    if (!items || items.length === 0) {
      throw new Error('Carrinho vazio');
    }

    // 2. Buscar os produtos no banco
    const productsDetails = [];

    for (const item of items) {
      const product =
        await this.orderRepository.findProductById(
          item.productId
        );

      if (!product) {
        throw new Error(
          `Produto ${item.productId} não encontrado`
        );
      }

      productsDetails.push({
        ...product,
        quantity: item.quantity
      });
    }

    // 3. Calcular o valor total
    let totalAmount = 0;

    for (const item of items) {
      const product = productsDetails.find(
        (p) => p.id === item.productId
      );

      if (!product) {
        throw new Error(
          `Produto ${item.productId} não encontrado`
        );
      }

      totalAmount += product.price * item.quantity;

      if (product.type === 'physical') {
        totalAmount += 10;
      }
    }

    // 4. Processar o pagamento
    if (paymentMethod === 'credit_card') {
      if (paymentDetails.cvv === '000') {
        throw new Error('Cartão recusado');
      }

    } else if (paymentMethod === 'debit_card') {
      // Simulação de pagamento no débito

    } else {
      throw new Error(
        'Método de pagamento não suportado'
      );
    }

    // 5. Salvar o pedido
    const order = await this.orderRepository.createOrder(
      customer,
      productsDetails,
      totalAmount
    );
   const emailPreview =
  await this.notificationService.sendOrderConfirmation(
    customer,
    order.id,
    totalAmount,
    productsDetails
  );

return {
  orderId: order.id,
  totalAmount,
  customer,
  productsDetails,
  emailPreview
};
  }
}
