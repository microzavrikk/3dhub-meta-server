import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PingQuery {
    @Field()
    ping!: string;
} 