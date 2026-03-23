import { generate, validate } from '../generator';
import * as fs from 'fs-extra';
import * as path from 'path';

describe('Generator', () => {
  const outputDir = 'tmp-test';

  beforeEach(async () => {
    await fs.emptyDir(outputDir);
  });

  test('validate rejects missing fields', () => {
    const mockError1 = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(validate({})).toBe(false);
    expect(mockError1).toHaveBeenCalledWith('❌ Missing required field: platform');
    mockError1.mockRestore();

    const mockError2 = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(validate({ platform: 'test' })).toBe(false);
    expect(mockError2).toHaveBeenCalledWith('❌ Missing required field: name');
    mockError2.mockRestore();
  });

  test('validate accepts valid config', () => {
    expect(validate({
      platform: 'test',
      name: 'test-adapter',
      authType: 'apiKey',
    })).toBe(true);
  });

  test('generate writes files', async () => {
    const config = {
      platform: 'test',
      name: 'test-adapter',
      authType: 'apiKey',
      features: [],
    };

    await generate(config, outputDir);

    expect(fs.pathExistsSync(path.join(outputDir, 'config.yaml'))).toBe(true);
  });
});
