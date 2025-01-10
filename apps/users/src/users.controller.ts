import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HealthCheck } from 'libs/health-check/health-check.base';

@Controller()
export class UsersController {
  private readonly healthChecker: HealthCheck;

  constructor(private readonly usersService: UsersService) {
    const client: ClientProxy = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 8877,
      },
    });

    this.healthChecker = new HealthCheck(client, {});
  }

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }

  @MessagePattern({ cmd: 'users.ping' })
  async healthCheck() {
    console.log("users ping");
    return this.healthChecker.checkCurrentNode('users');
  }
}