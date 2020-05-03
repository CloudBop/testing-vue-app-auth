/**
 * 
 * @jest-environment node
 * 
 */
import loginValidator from '@validators/login';
//
describe('the login validator', () => {
  //
  it('should call the next function (middleware) when validation succeeds', async () => {
    //
    const req = {
      body: {
        email: 'a@b.com',
        password: 'password'
      }
    };
    //
    const res = {};
    //
    // mock the next() fn
    const next = jest.fn();
    //
    await loginValidator(req, res, next);
    //
    expect(next).toHaveBeenCalled();
  });
});
