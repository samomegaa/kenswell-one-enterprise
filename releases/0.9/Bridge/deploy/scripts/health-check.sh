#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"

check_endpoint() {
  local path="$1"
  local url="${BASE_URL}${path}"

  if command -v curl >/dev/null 2>&1; then
    curl -fsS "$url" >/dev/null
  else
    node -e "
      fetch('$url')
        .then((res) => {
          if (!res.ok) throw new Error('HTTP ' + res.status);
        })
        .catch((err) => {
          console.error(err.message);
          process.exit(1);
        });
    "
  fi

  echo "OK ${path}"
}

check_endpoint "/live"
check_endpoint "/health"
check_endpoint "/ready"

echo "Health checks passed"
