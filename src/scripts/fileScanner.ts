import * as path from 'path';
import { LoggingSystem } from '../utilities/loggingSystem';

class FileScanner {
  categorizedFiles: {
    images: string[];
    documents: string[];
    videos: string[];
    others: string[];
  };
  loggingSystem: LoggingSystem;

  constructor(loggingSystem: LoggingSystem) {
    this.loggingSystem = loggingSystem;
    this.categorizedFiles = {
      images: [],
      documents: [],
      videos: [],
      others: [],
    };
  }

  scanDirectory(directoryPath: string) {
    const fs = require('fs');
    const files = fs.readdirSync(directoryPath);
    files.forEach((file: string) => {
      const fullPath = path.join(directoryPath, file);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        this.scanDirectory(fullPath); // Recursively scan subdirectories
      } else {
        this.categorizeFile(file, fullPath);
      }
    });
  }

  categorizeFile(fileName: string, fullPath: string) {
    const ext = path.extname(fileName).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
      this.categorizedFiles.images.push(fullPath);
    } else if (['.pdf', '.doc', '.docx', '.txt'].includes(ext)) {
      this.categorizedFiles.documents.push(fullPath);
    } else if (['.mp4', '.mkv', '.avi'].includes(ext)) {
      this.categorizedFiles.videos.push(fullPath);
    } else {
      this.categorizedFiles.others.push(fullPath);
    }
  }

  getCategorizedResults() {
    return this.categorizedFiles;
  }
}

export { FileScanner };