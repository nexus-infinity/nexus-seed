import { WorkflowManager } from '../../src/middle-end/workflowManager';
import { TaskQueue } from '../../src/middle-end/taskQueue';

let workflowManager: WorkflowManager;
let taskQueue: TaskQueue;

beforeEach(() => {
  taskQueue = new TaskQueue();
  workflowManager = new WorkflowManager(taskQueue);
});

test('should process small tasks immediately', () => {
  const task = { id: 2, type: 'small' };
  workflowManager.addTask(task);
  workflowManager.processTasks();
  expect(taskQueue.getProcessedTasks()).toContain(task);
});

test('should defer large tasks', () => {
  const task = { id: 3, type: 'large' };
  workflowManager.addTask(task);
  workflowManager.processTasks();
  expect(taskQueue.getProcessedTasks()).not.toContain(task);
  expect(taskQueue.getDeferredTasks()).toContain(task);
});

test('should process deferred large tasks when conditions are met', () => {
  const task = { id: 4, type: 'large' };
  workflowManager.addTask(task);
  workflowManager.processTasks();
  workflowManager.processDeferredTasks();
  expect(taskQueue.getProcessedTasks()).toContain(task);
});
