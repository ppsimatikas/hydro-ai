import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown'

const SlowText = ({ text, textLoaded, revealSpeed = 25 }) => {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    if (visibleText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setVisibleText(text.slice(0, visibleText.length + 1));
      }, revealSpeed);
      return () => clearTimeout(timeoutId);
    }
    textLoaded();
  }, [visibleText, text, revealSpeed]);

  return (
    <p className="mp">
        <Markdown>{visibleText}</Markdown>
    </p>
  );
};

export default SlowText;
