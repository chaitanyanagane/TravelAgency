/* eslint-disable @typescript-eslint/no-require-imports */
const bcrypt = require('bcryptjs');

bcrypt.hash('Admin@123', 10).then(console.log);
