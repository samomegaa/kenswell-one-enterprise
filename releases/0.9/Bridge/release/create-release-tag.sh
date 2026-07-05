#!/usr/bin/env bash
set -euo pipefail

TAG="${1:-v0.9.0-rc2}"
MESSAGE="${2:-Kenswell One Bridge 0.9.0 RC2}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a git repository"
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Working tree is not clean. Commit or stash changes first."
  exit 1
fi

if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "Tag already exists: $TAG"
  exit 1
fi

git tag -a "$TAG" -m "$MESSAGE"

echo "Created tag: $TAG"
echo "Push with:"
echo "git push origin $TAG"
