// pages/page.js
'use client'
import React, { useEffect, useRef, useState } from 'react';
import Vara from 'vara';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  const isVaraInitialized = useRef(false);
  const [isVaraAnimationComplete, setIsVaraAnimationComplete] = useState(false);
  const [typewriterFontSize, setTypewriterFontSize] = useState(48);

  useEffect(() => {
    if (!isVaraInitialized.current) {
      isVaraInitialized.current = true;
      const calculateFontSize = () => {
        const screenFontSize = window.screen.width < 700 ? 32 : window.screen.width < 1200 ? 56 : 72;
        setTypewriterFontSize(screenFontSize);
        return screenFontSize;
      };

      const fontSize = calculateFontSize();

      const vara = new Vara(
        "#container",
        "https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Satisfy/SatisfySL.json",
        [
          {
            text: "My name is Marcin Knara",
            y: 50, // Adjusted the y position to reduce space
            fromCurrentPosition: { y: false },
            duration: 3000
          },
        ],
        {
          strokeWidth: 2,
          color: "#523c33",
          fontSize: fontSize,
          textAlign: "center"
        }
      );

      vara.ready(function () {
        vara.animationEnd(function (i, o) {
          setIsVaraAnimationComplete(true);
        });
      });

      // Add event listener to update font size on resize
      window.addEventListener('resize', calculateFontSize);

      // Cleanup event listener on component unmount
      return () => window.removeEventListener('resize', calculateFontSize);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
      <div id="container"></div>
      {isVaraAnimationComplete && (
        <div id="subheader" style={{ fontSize: `${typewriterFontSize/2}px`, color: '#523c33', marginTop: '10px' }}>
          <Typewriter
            words={['[Pronounced Mar-chin Ck-nara]','Welcome to my site!', 'I dabble in many things.', 'Scroll and take a look around!']}
            loop={1}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </div>
      )}
    </div>
  );
}