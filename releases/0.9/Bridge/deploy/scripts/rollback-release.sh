#!/usr/bin/env bash
set -euo pipefail

BACKUP_ARCHIVE="${1:-}"

if [ -z "$BACKUP_ARCHIVE" ]; then
  echo "Usage: $0 <backup-archive>"
  exit 1
fi

if [ ! -f "$BACKUP_ARCHIVE" ]; then
  echo "Backup archive not found: $BACKUP_ARCHIVE"
  exit 1
fi

tar -xzf "$BACKUP_ARCHIVE"

echo "Rollback archive restored: $BACKUP_ARCHIVE"
