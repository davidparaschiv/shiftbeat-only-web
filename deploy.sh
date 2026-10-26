#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel)"
REMOTE="${REMOTE:-origin}"
PAGES_BRANCH="${PAGES_BRANCH:-gh-pages}"
TEMP_BRANCH="pages-deploy-$(date +%Y%m%d-%H%M%S)"
TEMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/shiftbeat-pages.XXXXXX")"

cleanup() {
  git -C "$REPO_ROOT" worktree remove --force "$TEMP_DIR" >/dev/null 2>&1 || true
  git -C "$REPO_ROOT" branch -D "$TEMP_BRANCH" >/dev/null 2>&1 || true
  rm -rf "$TEMP_DIR"
}
trap cleanup EXIT INT TERM

if [[ -n "$(git -C "$REPO_ROOT" status --porcelain --untracked-files=no)" ]]; then
  echo "Deployment stopped: commit or stash tracked changes first."
  exit 1
fi

echo "Creating temporary deployment branch: $TEMP_BRANCH"
git -C "$REPO_ROOT" worktree add --detach "$TEMP_DIR" HEAD >/dev/null
git -C "$TEMP_DIR" switch --orphan "$TEMP_BRANCH" >/dev/null
git -C "$TEMP_DIR" rm -rf . >/dev/null 2>&1 || true

rsync -a \
  --exclude='.git/' \
  --exclude='deploy.sh' \
  --exclude='soundblast-backend/' \
  --exclude='*.dmg' \
  --exclude='.preview/' \
  --exclude='.DS_Store' \
  "$SCRIPT_DIR/" "$TEMP_DIR/"
touch "$TEMP_DIR/.nojekyll"

git -C "$TEMP_DIR" add --all
git -C "$TEMP_DIR" commit -m "Deploy SHIFT Beat website" >/dev/null

echo "Publishing to $REMOTE/$PAGES_BRANCH"
git -C "$TEMP_DIR" push --force "$REMOTE" "$TEMP_BRANCH:$PAGES_BRANCH"

echo "Published successfully. Removing temporary branch."
