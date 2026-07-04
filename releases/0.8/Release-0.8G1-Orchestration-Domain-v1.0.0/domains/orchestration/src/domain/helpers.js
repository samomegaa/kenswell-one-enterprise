import crypto from 'crypto';

export function createId(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function nowIso() {
  return new Date().toISOString();
}

export function normalizeMetadata(value) {
  return value && typeof value === 'object' ? { ...value } : {};
}

export function assertRequired(value, message) {
  if (value === undefined || value === null || value === '') {
    throw new Error(message);
  }
}
