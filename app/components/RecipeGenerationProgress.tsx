import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

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
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Generating Your Recipe Collection
        </h3>
        {progress.status === 'IN_PROGRESS' && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
      </div>

      <Progress value={percentComplete} className="w-full" />
      
      <div className="flex justify-between text-sm text-gray-600">
        <span>{progress.completed} of {progress.total} recipes generated</span>
        <span>{percentComplete}%</span>
      </div>

      {progress.failed > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Generation Issues</AlertTitle>
          <AlertDescription>
            {progress.failed} recipes failed to generate. Don't worry - we'll keep trying!
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