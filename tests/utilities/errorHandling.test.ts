import { handleError, retryOperation } from '../../src/utilities/errorHandling';

describe('Error Handling Utilities', () => {
    test('handleError should log the error message', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const errorMessage = 'Test error message';

        handleError(errorMessage);

        expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
        consoleSpy.mockRestore();
    });

    test('retryOperation should retry the operation on failure', async () => {
        const mockFunction = jest.fn()
            .mockRejectedValueOnce(new Error('First attempt failed'))
            .mockResolvedValue('Success on second attempt');

        const result = await retryOperation(mockFunction, 2);

        expect(mockFunction).toHaveBeenCalledTimes(2);
        expect(result).toBe('Success on second attempt');
    });

    test('retryOperation should throw an error after max retries', async () => {
        const mockFunction = jest.fn().mockRejectedValue(new Error('Always fails'));

        await expect(retryOperation(mockFunction, 3)).rejects.toThrow('Always fails');
        expect(mockFunction).toHaveBeenCalledTimes(3);
    });
});