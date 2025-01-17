export function logInfo(message: string): void {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
}

export function logWarning(message: string): void {
    console.warn(`[WARNING] ${new Date().toISOString()}: ${message}`);
}

export function logError(message: string): void {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
}

export function logProgress(current: number, total: number): void {
    const percentage = ((current / total) * 100).toFixed(2);
    console.log(`[PROGRESS] ${new Date().toISOString()}: ${percentage}% completed`);
}

export class LoggingSystem {
  log(message: string): void {
    console.log(message);
  }
}