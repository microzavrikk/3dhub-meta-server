import { Controller, Get, Res } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Response } from 'express';
import { HealthCheck } from 'libs/health-check/health-check.base';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  private readonly healthChecker: HealthCheck;
  
  constructor(private readonly gatewayService: GatewayService) {
    const client: ClientProxy = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222'],
        queue: 'gateway_queue',
      },
    });
    this.healthChecker = new HealthCheck(client, {});
  }

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  @Get('/health')
  async healthCheck(@Res() response: Response) {
    console.log("health check request received");
    const statuses = await this.healthChecker.checkAllNodes();
    const isAllNodesUp = statuses.downNodes.length === 0;
    response.status(isAllNodesUp ? 200 : 500).send(statuses);
    return response;
  }
}