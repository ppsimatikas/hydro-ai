import React, { useState, useEffect } from 'react';

function LoadingDots() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500); // Change the interval as needed

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return <p className="mp">{dots}</p>;
}

export default LoadingDots;
