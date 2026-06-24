#!/bin/sh
set -e

echo "Running database migrations..."
node node_modules/.bin/typeorm -d dist/core/db/data-source.js migration:run

echo "Starting application..."
exec node dist/main.js
