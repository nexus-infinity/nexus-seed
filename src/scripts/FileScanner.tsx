import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function FileScanner() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleScan = async () => {
    setScanning(true);
    setProgress(0);
    
    // Simulate scanning progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    setScanning(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Scanner</CardTitle>
        <CardDescription>
          Select a directory to scan for files and extract metadata.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {scanning && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground">
              Scanning files... {progress}%
            </p>
          </div>
        )}
        <div className="flex gap-4">
          <Button onClick={handleScan} disabled={scanning}>
            {scanning ? 'Scanning...' : 'Start Scan'}
          </Button>
          <Button variant="outline" disabled={scanning}>
            Select Directory
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

