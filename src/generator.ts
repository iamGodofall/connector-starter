import * as fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'js-yaml';

/**
 * Generator module: template rendering, validation, file writing.
 */

export const templatesDir = path.join(process.cwd(), 'templates');
const templates = {
  'adapter.ts.tmpl': 'adapter.ts',
  'auth.ts.tmpl': 'auth.ts',
  'cache.ts.tmpl': 'cache.ts',
  'audit.ts.tmpl': 'audit.ts',
  'package.json.tmpl': 'package.json',
  'README.md.tmpl': 'README.md',
};

export async function generate(config: any, outputDir: string) {
  await fs.ensureDir(outputDir);

  for (const [tmplFile, targetFile] of Object.entries(templates)) {
    const tmplPath = path.join(templatesDir, tmplFile);
    if (!fs.existsSync(tmplPath)) {
      console.warn(`⚠️ Template missing: ${tmplFile}`);
      continue;
    }

    let content = await fs.readFile(tmplPath, 'utf8');
    content = content
      .replace(/\{\{platform\}\}/g, config.platform)
      .replace(/\{\{name\}\}/g, config.name)
      .replace(/\{\{authType\}\}/g, config.authType)
      .replace(/\{\{features\}\}/g, JSON.stringify(config.features));

    const targetPath = path.join(outputDir, targetFile);
    await fs.writeFile(targetPath, content);
  }

  // Write config.yaml
  const configYaml = yaml.dump({
    platform: config.platform,
    authType: config.authType,
    features: config.features,
  });
  await fs.writeFile(path.join(outputDir, 'config.yaml'), configYaml);

  console.log('✅ All files generated');
}

export function validate(config: any): boolean {
  const required = ['platform', 'name', 'authType'];
  for (const field of required) {
    if (!config[field]) {
      console.error(`❌ Missing required field: ${field}`);
      return false;
    }
  }
  return true;
}

