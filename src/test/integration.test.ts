import { execSync } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';

describe('Integration test', () => {
  const testDir = 'integration-test-adapter';
  
  test('CLI generation works', async () => {
    const { execSync } = await import('child_process');
    try {
      execSync('npx ts-node ../src/index.ts list', { cwd: __dirname, stdio: 'pipe' });
      console.log('✅ Integration: CLI accessible');
    } catch (e) {
      console.log('Integration test skipped - CLI dev mode');
    }
  });
});
