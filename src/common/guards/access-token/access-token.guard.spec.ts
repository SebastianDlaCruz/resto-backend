import { AccesTokenGuard } from './access-token.guard';

describe('AccesTokenGuard', () => {
  it('should be defined', () => {
    expect(new AccesTokenGuard()).toBeDefined();
  });
});
