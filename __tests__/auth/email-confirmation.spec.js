/**
 * @jest-environment node
 */
import User from '@models/User';
import supertest from 'supertest';
// - notice how index sets the listener, app sets up the listener
import server from '@server/app';
import { disconnect } from '@tests/utils/mongoose';
//
const app = () => supertest(server);
//
describe('The register process', () => {
  //
  let user = {
    name: 'Test User',
    email: 'test@user.com',
    password: 'password'
  };
  const EMAIL_CONFIRM_ENDPOINT = '/api/v1/auth/emails/confirm';
  //
  beforeEach(async () => {
    await User.deleteMany({});
  });
  //
  it('returns a 422 if token is invalid', async () => {
    //
    const response = await app().post(EMAIL_CONFIRM_ENDPOINT).send({ token: 'xxx' });
    //
    expect(response.status).toBe(422);
    expect(response.body.message).toBe('Validation failed.');
  });
  //
  it('confirms a user email', async () => {
    // setup / preperation
    const createdUser = await User.create(user);
    //
    const response = await app().post(EMAIL_CONFIRM_ENDPOINT).send({ token: createdUser.emailConfirmCode });
    // assertions
    expect(response.status).toBe(200);
    expect(response.body.data.user.emailConfirmCode).toBeNull();
    expect(response.body.data.user.emailConfirmedAt).toBeDefined();
    //
    // - check db was update properly
    const freshUser = await User.findOne({ email: createdUser.email });
    // assert db updated.
    expect(freshUser.emailConfirmCode).toBeNull();
    expect(freshUser.emailConfirmedAt).toBeDefined();
  });
  //
  afterAll(async () => {
    await disconnect();
  });
});
