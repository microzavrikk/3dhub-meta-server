import { Module } from '@nestjs/common';
import { PingQueryResolver } from './ping.query.resolver';

@Module({
    providers: [PingQueryResolver],
})
export class PingModule {} 