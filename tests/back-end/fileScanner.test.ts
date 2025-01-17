import { FileScanner } from '../../src/back-end/fileScanner';
import { LoggingSystem } from '../../src/utilities/loggingSystem';

let fileScanner: FileScanner;
let loggingSystem: LoggingSystem;

beforeEach(() => {
  loggingSystem = new LoggingSystem();
  fileScanner = new FileScanner(loggingSystem);
});

test('should categorize files correctly', () => {
  const result = fileScanner.scanFiles([]);
  expect(Array.isArray(result.categorizedFiles)).toBe(true);
  expect(result.categorizedFiles).toEqual([]);
});
