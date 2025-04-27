'use client';

import { useEffect, useState } from 'react';

const TypewriterHeader = () => {
  const [text, setText] = useState('');
  const fullText = 'looking for recipe ideas?';
  const typingSpeed = 100; // Medium pace - 100ms per character
  const pauseDuration = 5000; // 5 seconds pause when complete

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const animateText = () => {
      // Typing
      if (text.length < fullText.length) {
        timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        // Wait 5 seconds then restart
        timeout = setTimeout(() => {
          setText('');
        }, pauseDuration);
      }
    };

    animateText();

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div className="relative min-h-[4rem] md:min-h-[5rem] flex items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
        {text || '\u00A0'}
      </h1>
    </div>
  );
};

export default TypewriterHeader; 