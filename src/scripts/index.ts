export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: Date;
}

export interface ScanResult {
  files: FileMetadata[];
  totalSize: number;
  scanDuration: number;
}

export interface TaskQueueItem {
  id: string;
  type: 'scan' | 'process' | 'extract';
  data: any;
  priority: number;
}

