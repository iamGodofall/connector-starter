#!/bin/bash
# Generate example connector

npx connector-starter create test-connector --platform mastodon

cd test-connector
npm install
npm test # Should pass basic tests
