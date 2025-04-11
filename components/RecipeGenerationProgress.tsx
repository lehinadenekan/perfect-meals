// components/RecipeGenerationProgress.tsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
// import { Progress } from '@/components/ui/progress'; // <-- Import commented out
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Assuming this still exists

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
    // Connect to the WebSocket server
    // Make sure the URL points to your server correctly, especially in production
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3001');

    console.log(`RecipeGenerationProgress: Connecting to WebSocket for job ${jobId}`);

    socket.on('connect', () => {
      console.log('WebSocket connected');
      // Join the room for this specific job
      socket.emit('joinJobRoom', jobId);
      console.log(`Joined room for job ${jobId}`);
    });

    socket.on('progressUpdate', (data: GenerationProgress) => {
      console.log('Progress update received:', data);
      setProgress(data);
      if (data.status === 'Completed' || data.status === 'Failed') {
         onComplete?.(); // Trigger callback if provided
         socket.disconnect(); // Disconnect after completion/failure
      }
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
      setProgress(prev => ({ ...prev, status: 'Error', error: 'Connection failed' }));
    });

    // Cleanup on component unmount
    return () => {
      console.log(`RecipeGenerationProgress: Disconnecting WebSocket for job ${jobId}`);
      socket.disconnect();
    };
  }, [jobId, onComplete]); // Add onComplete to dependency array

  const percentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

  return (
    <div className="w-full max-w-md p-4 space-y-4">
      {progress.status === 'Failed' || progress.error ? (
         <Alert variant="destructive">
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>{progress.error || 'An unknown error occurred during recipe generation.'}</AlertDescription>
         </Alert>
      ) : progress.status === 'Completed' ? (
         <Alert variant="default"> {/* Use default variant for success */}
            <AlertTitle>Generation Complete!</AlertTitle>
            <AlertDescription>{progress.total} recipes generated successfully.</AlertDescription>
         </Alert>
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
            {/* You could add a simple text placeholder here if needed */}
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
