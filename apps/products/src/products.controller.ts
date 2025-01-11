import { Controller, Get } from '@nestjs/common';
import { MessagePattern, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HealthCheck } from 'libs/health-check/health-check.base';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  private readonly healthChecker: HealthCheck;
  
  constructor(private readonly productsService: ProductsService) {
    const client: ClientProxy = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222'],
      },
    });
    this.healthChecker = new HealthCheck(client, {});
  }

  @MessagePattern({ cmd: 'products.ping' })
  async healthCheck() {
    return this.healthChecker.checkCurrentNode('products');
  }
}