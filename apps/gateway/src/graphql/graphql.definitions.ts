import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./apps/gateway/**/*.gql'],
  path: join(process.cwd(), 'apps/gateway/src/utils/graphql/types/graphql.ts'),
  outputAs: 'class',
  debug: false,
});
