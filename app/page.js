// pages/page.js
'use client'
import React, { useEffect, useRef, useState } from 'react';
import Vara from 'vara';
import { Typewriter } from 'react-simple-typewriter';
import HTMLFlipBook from "react-pageflip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import MyBook from './components/MyBook'; // Import MyBook component

import ReactFlipCard from 'reactjs-flip-card';

export default function Home() {
  const isVaraInitialized = useRef(false);
  const [isVaraAnimationComplete, setIsVaraAnimationComplete] = useState(false);
  const [typewriterFontSize, setTypewriterFontSize] = useState(48);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const flipBookRef = useRef();

  const styles = {
    card: { background: 'blue', color: 'white', borderRadius: 20, },
  }

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
        "#title",
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

    const handleResize = () => {
      setDimensions({
        width: 0.8 * window.innerWidth / 2,
        height: 0.8 * window.innerHeight,
      });
    };
    // Set initial dimensions
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  const goToPage = (pageNumber) => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flip(pageNumber);
    }
  };

  return (
    <div id='container'>
      <div id='section1' style={{ position: 'relative', textAlign: 'center', paddingTop: '20px' }}>
        <div id="title"></div>
        <img src="/MarcinCouchWebsite.png" alt="Description of image" style={{ marginTop: '20px', maxWidth: '80%', height: 'auto' }} />
        {isVaraAnimationComplete && (
          <div id="subheader" style={{ fontSize: `${typewriterFontSize / 2}px`, color: '#523c33', marginTop: '90px', position: 'absolute', top: '100px', width: '100%', textAlign: 'center' }}>
            <Typewriter
              words={['[Pronounced Mar-chin Ck-nara]', 'Welcome to my site!', 'I dabble in many things.', 'Scroll and take a look around!']}
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
      <div id='section2' className="section" style={{ textAlign: 'center', paddingTop: '20px' }}>
        {/* <h1>About Me</h1> */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ReactFlipCard
            frontStyle={styles.card}
            backStyle={styles.card}
            frontComponent={<div>Hover me!</div>}
            backComponent={<div>Back!</div>}
          />
          <MyBook />
        </div>
      </div>
      <div id='section3' className="section" style={{ textAlign: 'center', paddingTop: '20px' }}>
        <h1>Experience</h1>
      </div>
      <div id='section4' className="section" style={{ textAlign: 'center', paddingTop: '20px' }}>
        <h1>Projects</h1>
      </div>
      <div id='section5' className="section" style={{ textAlign: 'center', paddingTop: '20px' }}>
        <h1>Hobbies</h1>
      </div>
    </div>
  );
}