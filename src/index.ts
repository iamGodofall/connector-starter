#!/usr/bin/env node

/**
 * Main entry point for connector-starter CLI.
 * Usage: npx connector-starter create mastodon
 */

import { createCommand, listCommand, helpCommand } from './cli';

const args = process.argv.slice(2);

if (args.length === 0) {
  helpCommand();
  process.exit(0);
}

const command = args[0];

const platform = args[1];

const nonInteractive = args.includes('--non-interactive');

switch (command) {

  case 'create':

    if (!platform) {

      console.error('Usage: connector-starter create <platform> [--non-interactive]');

      process.exit(1);

    }

    createCommand(platform, nonInteractive);

    break;
  case 'list':
    listCommand();
    break;
  case 'help':
    helpCommand();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}
