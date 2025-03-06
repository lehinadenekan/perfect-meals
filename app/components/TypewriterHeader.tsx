'use client';

import { useEffect, useState } from 'react';

const TypewriterHeader = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = 'plan your perfect meals_';
  const typingSpeed = 100; // Medium pace - 100ms per character
  const deleteSpeed = 50; // Faster deletion
  const pauseDuration = 5000; // 5 seconds pause when complete

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const animateText = () => {
      if (!isDeleting) {
        // Typing
        if (text.length < fullText.length) {
          timeout = setTimeout(() => {
            setText(fullText.slice(0, text.length + 1));
          }, typingSpeed);
        } else {
          // Wait 5 seconds before starting deletion
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        // Deleting
        if (text.length > 0) {
          timeout = setTimeout(() => {
            setText(text.slice(0, -1));
          }, deleteSpeed);
        } else {
          setIsDeleting(false);
        }
      }
    };

    animateText();

    return () => clearTimeout(timeout);
  }, [text, isDeleting]);

  return (
    <h1 className="text-4xl md:text-6xl font-bold text-black mb-8">
      {text}
    </h1>
  );
};

export default TypewriterHeader; 