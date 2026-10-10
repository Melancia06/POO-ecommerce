
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OrderRepository {

  async findProductById(productId: number) {
    return prisma.product.findUnique({
      where: { id: productId }
    });
  }

  async createOrder(
    customer: string,
    productsDetails: any[],
    totalAmount: number
  ) {
    return prisma.order.create({
      data: {
        customer,
        items: JSON.stringify(productsDetails),
        total: totalAmount,
        status: 'confirmed'
      }
    });
  }

}
