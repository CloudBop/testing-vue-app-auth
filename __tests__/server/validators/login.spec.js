/**
 * 
 * @jest-environment node
 * 
 */
import loginValidator from '@validators/login';
//
// mock Express response fn
class Response {
  status(status) {
    this.status = status;
    return this;
  }
  json(data) {
    return data;
  }
}
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
  //
  //
  it('should return a 422 error if validation fails', async () => {
    const req = {
      body: {
        password: 'password'
      }
    };
    //
    const next = jest.fn();

    const res = new Response();

    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    await loginValidator(req, res, next);
    // 422 error code
    expect(statusSpy).toHaveBeenCalledWith(422);
    // yup api
    expect(jsonSpy).toHaveBeenCalled({
      message: 'Validation failed.',
      data: {
        email: 'email is a required field'
      }
    });
  });
});
