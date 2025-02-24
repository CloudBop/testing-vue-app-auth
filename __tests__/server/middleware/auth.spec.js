/**
 * 
 * @jest-environment node
 * 
 */
import User from '@models/User';
//
// import mongoose from 'mongoose';
import { connect, disconnect } from '@tests/utils/mongoose';
import Response from '@tests/utils/response';

// not in use
// import jwt from 'jsonwebtoken';
// server/config - signiture for jwt
// import config from '@config';
//
import authMiddleware from '@middleware/auth';
//
describe('The auth middleware', () => {
  // create new test user
  const user = {
    name: 'Test User',
    email: 'test@user.com',
    password: 'password'
  };
  //
  let createdUser;
  // run this before all tests
  beforeAll(async () => {
    // connect to db
    await connect();
    //
    createdUser = await User.create(user);
  });
  //
  it('should call the next() function if authentication is successful', async () => {
    //
    const access_token = createdUser.generateToken();
    const req = {
      body: {
        access_token
      }
    };
    //
    const res = new Response();
    //
    const next = jest.fn();
    //
    await authMiddleware(req, res, next);
    //
    expect(next).toHaveBeenCalled();
  });
  //
  it('should return a 401 if authentication failes', async () => {
    const req = {
      body: {}
    };
    //
    const res = new Response();
    //
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');
    const next = jest.fn();
    //
    await authMiddleware(req, res, next);
    //
    expect(next).toHaveBeenCalledTimes(0);
    //
    expect(statusSpy).toHaveBeenCalledWith(401);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Unauthenticated.'
    });
  });
  //
  afterAll(async () => {
    // close connection
    await disconnect();
  });
});
// by default jest is setup for jsdom. The comment at top of file tell jest to test for node env.
