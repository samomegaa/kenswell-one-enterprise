function required(env, key) {
  const value = env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

function optional(env, key, fallback = null) {
  return env[key] || fallback;
}

function boolean(env, key, fallback = false) {
  if (env[key] === undefined) return fallback;

  return ['true', '1', 'yes', 'on'].includes(String(env[key]).toLowerCase());
}

function number(env, key, fallback = null) {
  if (env[key] === undefined || env[key] === '') return fallback;

  const parsed = Number(env[key]);

  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }

  return parsed;
}

function csv(env, key, fallback = []) {
  if (!env[key]) return fallback;

  return env[key]
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

module.exports = {
  required,
  optional,
  boolean,
  number,
  csv,
};
