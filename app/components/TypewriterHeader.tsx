'use client';

import { useEffect, useState } from 'react';

const TypewriterHeader = () => {
  const [text, setText] = useState('');
  const fullText = 'plan your perfect meals_';
  const typingSpeed = 200; // Slower pace - 200ms per character
  const pauseDuration = 5000; // 5 seconds pause when complete

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const animateText = () => {
      if (text.length < fullText.length) {
        // Typing
        timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        // Reset after pause
        timeout = setTimeout(() => {
          setText('');
        }, pauseDuration);
      }
    };

    animateText();

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <h1 className="text-4xl md:text-6xl font-bold text-black mb-8">
      {text}
    </h1>
  );
};

export default TypewriterHeader; 