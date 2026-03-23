Write-Host "🚀 Running connector-starter demo..."

# Clean previous
if (Test-Path mastodon-adapter) {
  Remove-Item -Recurse -Force mastodon-adapter
}

npx ts-node src/index.ts create mastodon --non-interactive

if (Test-Path mastodon-adapter) {
  Push-Location mastodon-adapter
  npm install
  Write-Host "✅ Generated mastodon-adapter with npm install complete!"
  Write-Host "Run 'npm test' to test adapter."
  Pop-Location
} else {
  Write-Host "❌ Generation failed"
  exit 1
}
