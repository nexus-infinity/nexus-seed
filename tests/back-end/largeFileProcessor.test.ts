import { Readable } from 'stream';
import * as fs from 'fs';
import { LoggingSystem } from '../utilities/loggingSystem';

export class LargeFileProcessor {
    private chunkSize: number;
    loggingSystem: LoggingSystem;

    constructor(loggingSystem: LoggingSystem, chunkSize: number = 1024 * 1024) { // Default chunk size is 1MB
        this.loggingSystem = loggingSystem;
        this.chunkSize = chunkSize;
    }

    public async processLargeFile(filePath: string): Promise<void> {
        const fileStream = this.openFileStream(filePath);
        await this.processFile(fileStream);
    }

    public async processFile(fileStream: Readable): Promise<void> {
        for await (const chunk of fileStream) {
            await this.processChunk(chunk as Buffer);
        }
        await this.closeFileStream(fileStream);
    }

    private openFileStream(filePath: string): Readable {
        return fs.createReadStream(filePath, { highWaterMark: this.chunkSize });
    }

    private async processChunk(chunk: Buffer): Promise<void> {
        // Implementation here
        this.loggingSystem.log(`Processing chunk of size: ${chunk.length}`);
    }

    private async closeFileStream(fileStream: Readable): Promise<void> {
        return new Promise((resolve, reject) => {
            fileStream.on('close', resolve);
            fileStream.on('error', reject);
            fileStream.destroy();
        });
    }
}