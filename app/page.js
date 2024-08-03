// pages/page.js
'use client'
import React, { useEffect, useRef, useState } from 'react';
import Vara from 'vara';
import { Typewriter } from 'react-simple-typewriter';
import ReactFlipCard from 'reactjs-flip-card';

export default function Home() {
  const isVaraInitialized = useRef(false);
  const [isVaraAnimationComplete, setIsVaraAnimationComplete] = useState(false);
  const [typewriterFontSize, setTypewriterFontSize] = useState(48);

  const styles = {
    card: { background: '#00b3ad', color: 'white', borderRadius: 20, },
    padding10: { padding: 10 },
    size200: { height: 400, width: 400, display: 'inline-block', padding: 20 },
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
  }, []);

  const flipCardStyle = {
    frontStyle: { background: 'blue', color: 'white', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    backStyle: { background: 'blue', color: 'white', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  };

  return (
    <div id='container'>
      <div id='section1'>
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
      <div id='section2' className="section">
        <h1>Projects</h1>
        <div id='horizontalContainer'>
          <div style={{ ...styles.size200 }}>
            <ReactFlipCard
              containerCss={'resizeBasedOnParent'}
              flipTrigger={"onClick"}
              frontStyle={styles.card}
              backStyle={styles.card}
              frontComponent={<div style={styles.padding10}>Fineas</div>}
              backComponent={<><div style={{ ...styles.padding10, overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>Fineas is my first attempt at creating a financial services web application. Taking inspiration from the now decomissioned financial budgeting app Mint, I am hoping to create a budgeting tool that can help anyone track their finances with the help of Machine Learning.
              </div>
              <div style={{ ...styles.padding10, overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>Points of Interest:</div></>}
            />
          </div>
          <div style={styles.size200}>
            <ReactFlipCard
              containerCss={'resizeBasedOnParent'}
              flipTrigger={"onClick"}
              frontStyle={styles.card}
              backStyle={styles.card}
              frontComponent={<div style={styles.padding10}>Saige</div>}
              backComponent={<div style={{ ...styles.padding10, overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>My first time working with a startup!</div>}
            />
          </div>
          {/* <div style={styles.size200}>
            <ReactFlipCard
              containerCss={'resizeBasedOnParent'}
              flipTrigger={"onClick"}
              frontStyle={styles.card}
              backStyle={styles.card}
              frontComponent={<div style={styles.padding10}>Hover me! I am a resized card</div>}
              backComponent={<div style={styles.padding10}>Back!</div>}
            />
          </div> */}
          {/* <div style={styles.size200}>
            <ReactFlipCard
              containerCss={'resizeBasedOnParent'}
              flipTrigger={"onClick"}
              frontStyle={styles.card}
              backStyle={styles.card}
              frontComponent={<div style={styles.padding10}>Hover me! I am a resized card</div>}
              backComponent={<div style={styles.padding10}>Back!</div>}
            />
          </div> */}
        </div>
      </div>
      <div id='section3' className="section">
        {/* <h1>Experience</h1> */}
        <div id="underConstruction" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' , fontSize: 80}}>
          <Typewriter
              words={['Under Construction', '. . .']}
              loop={0}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
        </div>
      </div>
      {/* <div id='section4' className="section">
        <h1>About Me</h1>
      </div>
      <div id='section5' className="section">
        <h1>Hobbies</h1>,
      </div> */}
    </div>
  );
}