export class ErrorHandling {
  handleError(error: Error): void {
    console.error(error.message);
  }
}

export function handleError(error: Error): void {
    console.error("An error occurred:", error.message);
    // Additional error handling logic can be implemented here
}

export function retryOperation(operation: () => Promise<any>, retries: number = 3): Promise<any> {
    return operation().catch((error) => {
        if (retries > 0) {
            console.warn(`Retrying operation, attempts left: ${retries}`);
            return retryOperation(operation, retries - 1);
        }
        throw error;
    });
}

export function logErrorToService(error: Error): void {
    // Placeholder for logging error to an external service
    console.log("Logging error to external service:", error);
}