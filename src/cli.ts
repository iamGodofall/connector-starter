import prompts from 'prompts';
import { generate, validate, templatesDir } from './generator';
import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * CLI commands for connector-starter.
 */

export async function createCommand(platform: string, nonInteractive = false) {

  const response: any = nonInteractive ? {

    name: `${platform}-adapter`,

    authType: 'apiKey',

    features: ['cache', 'audit'],

  } : await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'Adapter name',
      initial: `${platform}-adapter`,
    },
    {
      type: 'select',
      name: 'authType',
      message: 'Auth type',
      choices: [
        { title: 'API Key', value: 'apiKey' },
        { title: 'OAuth2', value: 'oauth2' },
        { title: 'Basic Auth', value: 'basic' },
      ],
    },
    {
      type: 'multiselect',
      name: 'features',
      message: 'Features',
      choices: [
        { title: 'Cache', value: 'cache', selected: true },
        { title: 'Audit Logs', value: 'audit', selected: true },
      ],
      hint: '- Space to select. Return to submit',
    },
  ]);

  if (!response.name) {
    console.error('❌ Adapter name required');
    process.exit(1);
  }

  const outputDir = path.join(process.cwd(), response.name);
  if (fs.existsSync(outputDir)) {
    console.error(`❌ Folder ${response.name} already exists`);
    process.exit(1);
  }

  const config = {
    platform,
    name: response.name,
    authType: response.authType,
    features: response.features || [],
  };

  const isValid = await validate(config);
  if (!isValid) {
    console.error('❌ Validation failed');
    process.exit(1);
  }

  await generate(config, outputDir);
  console.log(`✅ Generated ${response.name} at ./${response.name}`);
}

export async function listCommand() {

  const tmplFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tmpl')).map(f => f.replace('.tmpl', ''));

  console.log(`Available templates: ${tmplFiles.join(', ')}`);

}

export async function helpCommand() {
  console.log(`
Usage: connector-starter create PLATFORM [options]

Commands:
  create PLATFORM  Generate connector for platform
  list            List templates  
  help            Show help

Examples:
  connector-starter create mastodon
  connector-starter list
  `);
}
