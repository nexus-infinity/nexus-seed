export class TaskQueue {
    private tasks: (() => Promise<void>)[] = [];
    private isProcessing: boolean = false;

    public addTask(task: () => Promise<void>): void {
        this.tasks.push(task);
        this.processTasks();
    }

    private async processTasks(): Promise<void> {
        if (this.isProcessing) return;
        this.isProcessing = true;

        while (this.tasks.length > 0) {
            const task = this.tasks.shift();
            if (task) {
                try {
                    await task();
                } catch (error) {
                    console.error('Error executing task:', error);
                }
            }
        }

        this.isProcessing = false;
    }
}