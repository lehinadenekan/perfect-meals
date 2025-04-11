// components/RecipeGenerationProgress.tsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
// import { Progress } from '@/components/ui/progress'; // <-- Import commented out
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // <-- Import commented out

interface GenerationProgress {
  status: string;
  completed: number;
  total: number;
  error?: string;
}

interface RecipeGenerationProgressProps {
  jobId: string;
  initialProgress?: GenerationProgress;
  onComplete?: () => void; // Optional callback when generation finishes
}

const RecipeGenerationProgress: React.FC<RecipeGenerationProgressProps> = ({
  jobId,
  initialProgress,
  onComplete
}) => {
  const [progress, setProgress] = useState<GenerationProgress>(
    initialProgress || { status: 'Initializing', completed: 0, total: 0 }
  );

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3001');
    console.log(`RecipeGenerationProgress: Connecting to WebSocket for job ${jobId}`);
    socket.on('connect', () => {
      console.log('WebSocket connected');
      socket.emit('joinJobRoom', jobId);
      console.log(`Joined room for job ${jobId}`);
    });
    socket.on('progressUpdate', (data: GenerationProgress) => {
      console.log('Progress update received:', data);
      setProgress(data);
      if (data.status === 'Completed' || data.status === 'Failed') {
         onComplete?.();
         socket.disconnect();
      }
    });
    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });
    socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
      setProgress(prev => ({ ...prev, status: 'Error', error: 'Connection failed' }));
    });
    return () => {
      console.log(`RecipeGenerationProgress: Disconnecting WebSocket for job ${jobId}`);
      socket.disconnect();
    };
  }, [jobId, onComplete]);

  const percentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

  return (
    <div className="w-full max-w-md p-4 space-y-4">
      {progress.status === 'Failed' || progress.error ? (
         // --- Alert component usage replaced with simple divs ---
         <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <h4 className="font-bold">Generation Failed</h4>
            <p>{progress.error || 'An unknown error occurred during recipe generation.'}</p>
         </div>
         /* --- Original Alert component usage commented out ---
         <Alert variant="destructive">
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>{progress.error || 'An unknown error occurred during recipe generation.'}</AlertDescription>
         </Alert>
         */
      ) : progress.status === 'Completed' ? (
         // --- Alert component usage replaced with simple divs ---
         <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
             <h4 className="font-bold">Generation Complete!</h4>
             <p>{progress.total} recipes generated successfully.</p>
         </div>
         /* --- Original Alert component usage commented out ---
         <Alert variant="default"> // Use default variant for success
            <AlertTitle>Generation Complete!</AlertTitle>
            <AlertDescription>{progress.total} recipes generated successfully.</AlertDescription>
         </Alert>
         */
      ) : (
         <>
            <div className="text-center">
               <p className="text-sm font-medium text-gray-700">{progress.status}...</p>
               <p className="text-xs text-gray-500">
               {progress.completed} of {progress.total} recipes generated
               </p>
            </div>
            {/* --- Progress component usage commented out ---
            <Progress value={percentage} className="w-full" />
            */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
         </>
      )}
    </div>
  );
};

export default RecipeGenerationProgress;