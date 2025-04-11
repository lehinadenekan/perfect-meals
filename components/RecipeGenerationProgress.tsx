import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface GenerationProgress {
  status: string;
  completed: number;
  failed: number;
  total: number;
  error?: string;
}

interface Props {
  jobId: string;
  onComplete?: () => void;
}

export function RecipeGenerationProgress({ jobId, onComplete }: Props) {
  const [progress, setProgress] = useState<GenerationProgress>({
    status: 'PENDING',
    completed: 0,
    failed: 0,
    total: 50
  });

  useEffect(() => {
    const socket = io();

    socket.on(`recipeGeneration:${jobId}`, (data: GenerationProgress) => {
      setProgress(data);
      if (data.status === 'COMPLETED' && onComplete) {
        onComplete();
      }
    });

    return () => {
      socket.off(`recipeGeneration:${jobId}`);
      socket.disconnect();
    };
  }, [jobId, onComplete]);

  const percentComplete = Math.round((progress.completed / progress.total) * 100);

  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold text-center">Generating Recipes...</h2>
      <Progress value={percentComplete} className="w-full" />
      <div className="text-sm text-gray-600 text-center">
        {progress.completed}/{progress.total} recipes generated
      </div>
      {progress.failed > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Generation Issues</AlertTitle>
          <AlertDescription>
            {progress.failed} recipes failed to generate. Don&apos;t worry - we&apos;ll keep trying!
          </AlertDescription>
        </Alert>
      )}
      {progress.status === 'COMPLETED' && (
        <Alert>
          <AlertTitle>Generation Complete!</AlertTitle>
          <AlertDescription>
            Successfully generated {progress.completed} new recipes for you to explore.
          </AlertDescription>
        </Alert>
      )}
      {progress.error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{progress.error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
} 