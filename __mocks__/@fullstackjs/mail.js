// create a mock of mail for tests
// when jest tests it uses this mock in replacement of the real library.
module.exports = class Mail {
  to() {
    return this;
  }
  subject() {
    return this;
  }
  data() {
    return this;
  }
  send() {
    return this;
  }
};
