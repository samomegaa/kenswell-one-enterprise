const bcrypt = require('bcryptjs');

const DEFAULT_SALT_ROUNDS = 12;

async function hashPassword(password) {
  if (!password || String(password).length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  return bcrypt.hash(String(password), DEFAULT_SALT_ROUNDS);
}

async function verifyPassword(password, passwordHash) {
  if (!password || !passwordHash) {
    return false;
  }

  return bcrypt.compare(String(password), passwordHash);
}

module.exports = {
  hashPassword,
  verifyPassword,
};
