#!/bin/bash
set -euo pipefail

APP_DIR="/var/www/threadVerse-frontEnd-new-dashboard"
APP_NAME="front-new-dashboard"
APP_URL="https://back.threatverse.net/"

echo "Starting deployment for ${APP_NAME}..."

cd "$APP_DIR"

current_branch=$(git branch --show-current)
upstream_branch=$(git rev-parse --abbrev-ref --symbolic-full-name @{upstream})

echo "Branch: ${current_branch}"
echo "Upstream: ${upstream_branch}"

echo "Fetching latest changes..."
git fetch origin --prune

echo "Pulling latest changes..."
git pull --ff-only

echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo "Building application..."
pnpm build

echo "Restarting PM2 app ${APP_NAME}..."
pm2 restart "$APP_NAME"
pm2 save

echo "Checking PM2 status..."
pm2 show "$APP_NAME" | sed -n '1,20p'

echo "Checking public URL..."
curl --include --silent --show-error --fail \
	--max-time 20 \
	--retry 10 \
	--retry-delay 2 \
	--retry-all-errors \
	--head \
	"$APP_URL" | sed -n '1,12p'

echo "Deployment completed successfully."
echo "Application available at: ${APP_URL}"