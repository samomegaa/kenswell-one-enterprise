#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="${1:-}"

if [ -z "$ENV_FILE" ]; then
  echo "Usage: $0 <env-file>"
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Environment file not found: $ENV_FILE"
  exit 1
fi

required_vars=(
  "NODE_ENV"
  "DATABASE_URL"
  "CLIENT_PORTAL_JWT_SECRET"
  "CLIENT_PORTAL_ALLOWED_ORIGINS"
  "CLIENT_PORTAL_PUBLIC_URL"
  "CLIENT_PORTAL_API_BASE_PATH"
  "LOG_LEVEL"
  "STORAGE_PROVIDER"
  "NOTIFICATION_PROVIDER"
)

missing=0

for key in "${required_vars[@]}"; do
  if ! grep -E "^${key}=.+" "$ENV_FILE" >/dev/null; then
    echo "Missing required env var: $key"
    missing=1
  fi
done

if [ "$missing" -ne 0 ]; then
  echo "Environment validation failed"
  exit 1
fi

secret_value="$(grep -E '^CLIENT_PORTAL_JWT_SECRET=' "$ENV_FILE" | cut -d '=' -f2-)"

if [ "${#secret_value}" -lt 16 ]; then
  echo "CLIENT_PORTAL_JWT_SECRET must be at least 16 characters"
  exit 1
fi

echo "Environment validation passed"
