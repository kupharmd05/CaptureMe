const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-680655.okta.com',
  token: '00Q69g59uBL-tRbivI5VLFfNWhs3oFb4P9WygKqp0n'
});

module.exports = client;