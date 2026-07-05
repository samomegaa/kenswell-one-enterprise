#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="${1:-releases/0.9/Bridge}"
BACKUP_DIR="${2:-releases/0.9/Bridge/deploy/backups}"

timestamp="$(date +%Y%m%d%H%M%S)"
mkdir -p "$BACKUP_DIR"

archive="$BACKUP_DIR/bridge-backup-${timestamp}.tar.gz"

tar \
  --exclude='**/node_modules' \
  --exclude='**/dist' \
  --exclude='**/.env' \
  --exclude='**/.env.local' \
  -czf "$archive" \
  "$SOURCE_DIR"

echo "Backup created: $archive"
