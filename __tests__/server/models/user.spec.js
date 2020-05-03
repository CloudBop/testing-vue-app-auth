/**
 * 
 * @jest-environment node
 * 
 */
import User from '@models/User';
//
import mongoose from 'mongoose';
//
import Bcrypt from 'bcryptjs';
//
describe('The User model', () => {
  // run this before all tests
  beforeAll(async () => {
    // connect to db
    await mongoose.connect('mongodb://localhost:27017/auth-app_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
  //
  it('should hash the user password before saving to the db', async () => {
    // create new test user
    const user = {
      name: 'Test User',
      email: 'test@user.com',
      password: 'password'
    };
    //
    // create new user from User Model
    const createdUser = await User.create(user);
    // comparse sync compares unhashed string with hashed string
    expect(Bcrypt.compareSync(user.password, createdUser.password)).toBe(true);
  });
  //
  it('should set the email confirm code for the user before saving to the db', async () => {
    // create new test user
    const user = {
      name: 'Test User',
      email: 'test@user.com',
      password: 'password'
    };
    // create new user from User Model
    const createdUser = await User.create(user);
    // confirmcode === String
    expect(createdUser.emailConfirmCode).toEqual(expect.any(String));
  });
  //
  afterAll(async () => {
    // close connection
    await mongoose.connection.close();
  });
});
// by default jest is setup for jsdom. The comment at top of file tell jest to test for node env.
