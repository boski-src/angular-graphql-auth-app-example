import { GraphQLModule } from './graphql.module';

describe('GraphQLModule', () => {
  let graphQLModule : GraphQLModule;

  beforeEach(() => {
    graphQLModule = new GraphQLModule(null,null,null, null);
  });

  it('should create an instance', () => {
    expect(graphQLModule).toBeTruthy();
  });
});
