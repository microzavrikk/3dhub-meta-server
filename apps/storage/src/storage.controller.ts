import { Controller, Get } from '@nestjs/common';
import { StorageService } from './storage.service';
import { MessagePattern, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HealthCheck } from 'libs/health-check/health-check.base';

@Controller()
export class StorageController {
  private readonly healthChecker: HealthCheck;
  
  constructor(private readonly storageService: StorageService) {
    const client: ClientProxy = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222'],
        queue: 'storage_queue',
      },
    });
    this.healthChecker = new HealthCheck(client, {});
  }

  @Get()
  getHello(): string {
    return this.storageService.getHello();
  }

  @MessagePattern({ cmd: 'storage.ping' })
  async healthCheck() {
    console.log("storage ping");
    return this.healthChecker.checkCurrentNode('storage');
  }
}