'use client';

import { useState } from 'react';
import { DietaryAnalysis } from '@/app/utils/dietary-classification';
import { FlagIcon } from '@heroicons/react/24/outline';

interface DietaryFeedbackProps {
  recipeId: string;
  dietaryAnalysis: DietaryAnalysis;
}

export function DietaryFeedback({ recipeId, dietaryAnalysis }: DietaryFeedbackProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState({
    lowFodmap: false,
    fermented: false,
    pescatarian: false,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/recipes/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId,
          feedback: {
            ...feedback,
            currentAnalysis: {
              isLowFodmap: dietaryAnalysis.isLowFodmap,
              isFermented: dietaryAnalysis.isFermented,
              isPescatarian: dietaryAnalysis.isPescatarian
            }
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setSubmitStatus('success');
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-500 hover:text-gray-700 group relative"
        aria-label="Report incorrect dietary classification"
      >
        <FlagIcon className="h-5 w-5" />
        <span className="invisible group-hover:visible absolute -top-8 left-0 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1">
          Report incorrect dietary classification
        </span>
      </button>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
      <h3 className="font-semibold text-lg">Report Incorrect Classification</h3>
      
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={feedback.lowFodmap}
            onChange={(e) => setFeedback(prev => ({ ...prev, lowFodmap: e.target.checked }))}
            className="rounded text-blue-500"
          />
          <span>Low FODMAP classification is incorrect</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={feedback.fermented}
            onChange={(e) => setFeedback(prev => ({ ...prev, fermented: e.target.checked }))}
            className="rounded text-blue-500"
          />
          <span>Fermented classification is incorrect</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={feedback.pescatarian}
            onChange={(e) => setFeedback(prev => ({ ...prev, pescatarian: e.target.checked }))}
            className="rounded text-blue-500"
          />
          <span>Pescatarian classification is incorrect</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Additional Comments
        </label>
        <textarea
          value={feedback.comment}
          onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
          className="w-full px-3 py-2 border rounded-md"
          rows={3}
          placeholder="Please provide any additional details about the incorrect classification..."
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !Object.values(feedback).some(Boolean)}
          className={`px-4 py-2 text-sm text-white rounded-md ${
            isSubmitting || !Object.values(feedback).some(Boolean)
              ? 'bg-blue-300'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>

      {submitStatus === 'success' && (
        <div className="text-green-600 text-sm">
          Thank you for your feedback!
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="text-red-600 text-sm">
          Failed to submit feedback. Please try again.
        </div>
      )}
    </div>
  );
} 