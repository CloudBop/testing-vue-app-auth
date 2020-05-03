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
  const REGISTER_ENDPOINT = '/api/v1/auth/register';
  //
  beforeEach(async () => {
    await User.deleteMany({});
  });
  //
  it('should register a new user', async () => {
    const response = await app().post(REGISTER_ENDPOINT).send(user);
    //
    // console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.message).toBe('Account registered.');
  });
  //
  it('should return a 422 if registration fails', async () => {
    // - PREPERATION STEP
    // create user
    await User.create(user);
    //
    // - ACTION STEP
    //
    const response = await app().post(REGISTER_ENDPOINT).send(user);
    //
    // - ASSERTION STEP
    //
    expect(response.status).toBe(422);
    // expect(response.body.data.token).toBeDefined();
    expect(response.body.message).toBe('Validation failed.');
    expect(response.body.data.errors).toEqual({
      email: 'This email has already been taken.'
    });
  });
  //
  afterAll(async () => {
    await disconnect();
  });
});
