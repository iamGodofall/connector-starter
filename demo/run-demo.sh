#!/bin/bash
set -e

echo "🚀 Running connector-starter demo..."

npx connector-starter create mastodon --non-interactive

if [ -d "mastodon-adapter" ]; then
  echo "✅ Generated mastodon-adapter"
  cd mastodon-adapter
  npm install
  echo "MASTODON_KEY=dummy npm test"
  echo "Demo complete! Check ./mastodon-adapter"
else
  echo "❌ Generation failed"
  exit 1
fi
