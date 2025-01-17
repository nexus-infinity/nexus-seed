import { TaskQueue } from '../../src/middle-end/taskQueue';

describe('TaskQueue', () => {
    let taskQueue: TaskQueue;

    beforeEach(() => {
        taskQueue = new TaskQueue();
    });

    test('should add a task to the queue', () => {
        const task = jest.fn();
        taskQueue.addTask(task);
        expect(taskQueue.getTasks()).toContain(task);
    });

    test('should execute tasks in the order they were added', async () => {
        const task1 = jest.fn().mockResolvedValue('Task 1 completed');
        const task2 = jest.fn().mockResolvedValue('Task 2 completed');

        taskQueue.addTask(task1);
        taskQueue.addTask(task2);

        await taskQueue.executeTasks();

        expect(task1).toHaveBeenCalled();
        expect(task2).toHaveBeenCalled();
        expect(task1).toHaveBeenCalledBefore(task2);
    });

    test('should handle errors in tasks', async () => {
        const errorTask = jest.fn().mockRejectedValue(new Error('Task failed'));
        const successTask = jest.fn().mockResolvedValue('Task completed');

        taskQueue.addTask(successTask);
        taskQueue.addTask(errorTask);

        await taskQueue.executeTasks();

        expect(successTask).toHaveBeenCalled();
        expect(errorTask).toHaveBeenCalled();
    });

    test('should clear the queue after execution', async () => {
        const task = jest.fn().mockResolvedValue('Task completed');
        taskQueue.addTask(task);

        await taskQueue.executeTasks();

        expect(taskQueue.getTasks()).toHaveLength(0);
    });
});