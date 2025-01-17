import { logMessage, logError } from '../../src/utilities/loggingSystem';

test('should log messages', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  logMessage('Test message');
  expect(consoleSpy).toHaveBeenCalledWith('Test message');
});

test('should log errors', () => {
  const consoleSpy = jest.spyOn(console, 'error');
  logError('Test error');
  expect(consoleSpy).toHaveBeenCalledWith('Test error');
});
