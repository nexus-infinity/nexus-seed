import { startFileScanning, displayProgress } from '../../src/front-end/cli';
import { startFileScanning, displayProgress, runCLI } from '../../src/front-end/cli';
import { WorkflowManager } from '../../src/middle-end/workflowManager';
import { LoggingSystem } from '../../src/utilities/loggingSystem';

describe('CLI Functionality', () => {
    test('should start file scanning process', () => {
        const result = startFileScanning();
        expect(result).toBeDefined();
        expect(result).toEqual(expect.stringContaining('Scanning started'));
    });

    test('should display progress updates', () => {
        const progress = displayProgress(50);
        expect(progress).toBeDefined();
        expect(progress).toEqual('Progress: 50%');
    });

    describe('CLI Functionality', () => {
        test('should start file scanning process', () => {
            const result = startFileScanning('/some/directory');
            expect(result).toBeUndefined();
        });

        test('should display progress updates', () => {
            const consoleSpy = jest.spyOn(console, 'log');
            displayProgress(50, 100);
            expect(consoleSpy).toHaveBeenCalledWith('Progress: 50 of 100 files scanned (50.00%)');
            consoleSpy.mockRestore();
        });

        test('should run CLI and initialize workflow manager', () => {
            const workflowManager = new WorkflowManager();
            const loggingSystem = new LoggingSystem();
            const logSpy = jest.spyOn(loggingSystem, 'log');
            const initSpy = jest.spyOn(workflowManager, 'initialize');

            runCLI(workflowManager, loggingSystem);

            expect(logSpy).toHaveBeenCalledWith('CLI started');
            expect(initSpy).toHaveBeenCalled();

            logSpy.mockRestore();
            initSpy.mockRestore();
        });
    });
});