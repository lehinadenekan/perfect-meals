import React, { useState, useRef, useEffect } from 'react';

interface ExclusionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExclusionsChange: (exclusions: string[]) => void;
  initialExclusions?: string[];
}

const ExclusionModal: React.FC<ExclusionModalProps> = ({
  isOpen,
  onClose,
  onExclusionsChange,
  initialExclusions = [],
}) => {
  const [excludedFoods, setExcludedFoods] = useState<string[]>(initialExclusions);
  const [inputValue, setInputValue] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setExcludedFoods(initialExclusions);
  }, [initialExclusions]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !excludedFoods.includes(inputValue.trim())) {
      const newExclusions = [...excludedFoods, inputValue.trim()];
      setExcludedFoods(newExclusions);
      onExclusionsChange(newExclusions);
      setInputValue('');
    }
  };

  const handleRemoveFood = (foodToRemove: string) => {
    const newExclusions = excludedFoods.filter(food => food !== foodToRemove);
    setExcludedFoods(newExclusions);
    onExclusionsChange(newExclusions);
  };

  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className="text-xl font-semibold mb-4 text-gray-800">
          Customise Food Exclusions
        </h2>
        <p className="text-gray-600 mb-4">
          Use the customisation window to exclude foods you don't like or are allergic to
        </p>

        <form onSubmit={handleAddFood} className="mb-4">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a food item and press Enter"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Add food to exclude"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add
            </button>
          </div>
        </form>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {excludedFoods.map((food) => (
              <span
                key={food}
                className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {food}
                <button
                  onClick={() => handleRemoveFood(food)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  aria-label={`Remove ${food}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExclusionModal; 