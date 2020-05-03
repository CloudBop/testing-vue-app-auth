/**
 * 
 * @jest-environment node
 * 
 */
import User from '@models/User';
//
import { connect, disconnect } from '@tests/utils/mongoose';

//
import Bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// server/config - signiture for jwt
import config from '@config';
//
describe('The User model', () => {
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
  it('should hash the user password before saving to the db', async () => {
    // comparse sync compares unhashed string with hashed string
    expect(Bcrypt.compareSync(user.password, createdUser.password)).toBe(true);
  });
  //
  it('should set the email confirm code for the user before saving to the db', async () => {
    // confirmcode === String
    expect(createdUser.emailConfirmCode).toEqual(expect.any(String));
  });
  //
  describe('the generate token method', () => {
    it('should generate a valid jwt for a user', () => {
      //
      const token = createdUser.generateToken();
      //
      const { id } = jwt.verify(token, config.jwtSecret);
      //
      // mongoose User Model _id: === typeof object
      // convert to string
      const stringedId = JSON.parse(JSON.stringify(createdUser._id));
      //
      expect(id).toEqual(stringedId);
    });
  });
  //
  afterAll(async () => {
    // close connection
    await disconnect();
  });
});
// by default jest is setup for jsdom. The comment at top of file tell jest to test for node env.
