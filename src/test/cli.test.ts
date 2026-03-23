import { createCommand, listCommand, helpCommand } from '../cli';
import prompts from 'prompts';
import * as fs from 'fs-extra';
import * as generator from '../generator';

jest.mock('prompts');
jest.mock('fs-extra');
const mockedFs = fs as jest.Mocked<typeof fs>;


// Mock process.exit
const mockExit = jest.fn();
(global as any).process.exit = mockExit;

describe('CLI commands', () => {
  beforeEach(() => {
    mockedFs.existsSync.mockReturnValue(false);
    mockExit.mockImplementation(() => {});
  });

  test('list command shows templates', async () => {
    // Mock templatesDir and fs.readdirSync for listCommand test
    const mockTemplatesDir = '/mock/templates';
    Object.defineProperty(generator, 'templatesDir', { value: mockTemplatesDir, writable: true });
    mockedFs.readdirSync.mockReturnValueOnce(['adapter.ts.tmpl', 'auth.ts.tmpl', 'cache.ts.tmpl', 'audit.ts.tmpl'] as any[]);
    
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    await listCommand();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Available templates'));
    consoleSpy.mockRestore();
  });

  test('list command handles empty templates', async () => {
    const mockTemplatesDir = '/mock/empty';
    Object.defineProperty(generator, 'templatesDir', { value: mockTemplatesDir, writable: true });
    mockedFs.readdirSync.mockReturnValueOnce([] as any[]);
    
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    await listCommand();
    expect(consoleSpy).toHaveBeenCalledWith('Available templates: ');
    consoleSpy.mockRestore();
  });

  test('help command shows usage', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    await helpCommand();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Usage: connector-starter'));
    consoleSpy.mockRestore();
  });



  test('create command prompts correctly', async () => {
    (prompts as jest.MockedFunction<typeof prompts>).mockResolvedValue({
      name: 'test-adapter',
      authType: 'apiKey',
      features: ['cache'],
    });

    // Mock fs.existsSync: true for templates, false for output dir
    mockedFs.existsSync.mockImplementation((p: any) => !p.toString().includes('test-adapter'));


    // @ts-ignore fs-extra overloads for mock
    // Mock other fs methods
    mockedFs.readFile.mockImplementation(async (_path: any) => '{{platform}} {{name}} template content');
    mockedFs.writeFile.mockImplementation(async (_path: any, _data: any) => {});
    mockedFs.ensureDir.mockImplementation(async (_path: any) => {});

    // Mock validate for happy path
    jest.spyOn(generator, 'validate').mockReturnValue(true as any);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    await createCommand('test-platform');
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
    warnSpy.mockRestore();
  });

  test('create command handles validation failure', async () => {
    (prompts as jest.MockedFunction<typeof prompts>).mockResolvedValue({
      name: 'invalid-adapter',
      authType: 'invalid',
    });
    mockedFs.existsSync.mockReturnValue(false);
    jest.spyOn(generator, 'validate').mockReturnValue(false);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await createCommand('test-platform');
    expect(consoleSpy).toHaveBeenCalledWith('❌ Validation failed');
    expect(mockExit).toHaveBeenCalledWith(1);
    consoleSpy.mockRestore();
  });
});


