import { Controller, Get } from '@nestjs/common';
import { MessagePattern, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HealthCheck } from 'libs/health-check/health-check.base';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  private readonly healthChecker: HealthCheck;
  
  constructor(private readonly ordersService: OrdersService) {
    const client: ClientProxy = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222'],
      },
    });
    this.healthChecker = new HealthCheck(client, {});
  }

  @MessagePattern({ cmd: 'orders.ping' })
  async healthCheck() {
    return this.healthChecker.checkCurrentNode('orders');
  }
}