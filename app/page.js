'use client'
import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const flipBookRef = useRef();

  useEffect(() => {
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

  function MyBook(props) {
    return (
      <HTMLFlipBook
        ref={flipBookRef}
        width={dimensions.width}
        height={dimensions.height}
        className="flipbook"
      >
        <div className="cover"></div>
        <div className="page">
          <h1 className="pageHeader">How To:</h1>
          <p className="pageContent">
            <ol>
              <li>Click on the navigation 'bookmarks' below to flip to the desired page.</li>
              <li>Click on the page you would like to flip.</li>
            </ol>
          </p>
        </div>
        <div className="page">
          <h1 className="pageHeader">About Me</h1>
          <p className="pageContent">
            Hi, my name is Marcin Knara (Mar-chin Ck-nara)!<br /><br />
            I'm a current software engineer that loves to dabble in:
            <ul className="aboutMeList">
              <li>Web Development</li>
              <li>Mobile App Development</li>
              <li>Photography & Videography</li>
              <li>Writing</li>
              <li>Armchair Philosophizing</li>
              <li>Personal Finance</li>
              <li>And Playing Video Games</li>
            </ul>
          </p>
        </div>
        <div className="page">
          <h1 className="pageHeader">Projects</h1>
          <p className="pageContent">
            Currently lacking the stellar projects resume, but there are some in the works:<br /><br />
            <ul className="aboutMeList">
              <li>Fineas</li>
              <p>Fineas is my first attempt at creating a financial services web application. Taking inspiration by the now decomissioned financial budgeting app Mint, I am hoping to create a budgeting tool that can help anyone track their finances with the help of Machine Learning.</p>
            </ul>
          </p>
        </div>
        <div className="page">
          <h1 className="pageHeader">Work Experience</h1>
          <p className="pageContent">This is the work experience section. It'll probably dispaly my resume or something.</p>
        </div>
        <div className="page">
          <h1 className="pageHeader">Contact Info</h1>
          <p className="pageContent">
            You can reach me or checkout my other profiles at:<br /><br />
            <ul className="contactList">
              <li>
                <a href="mailto:marcinknara@gmail.com">
                  <FontAwesomeIcon icon={faEnvelope} /> marcinknara@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/marcinknara" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/marcinknara" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} /> GitHub
                </a>
              </li>
            </ul>
          </p>
        </div>
      </HTMLFlipBook>
    );
  }

  return (
    <main className="main-container">
      {dimensions.width > 0 && dimensions.height > 0 && <MyBook />}
      <div className="navigation-buttons">
        <button onClick={() => goToPage(0)}>
          <FontAwesomeIcon icon={faBookmark} />
          <span>Cover</span>
        </button>
        <button onClick={() => goToPage(2)}>
          <FontAwesomeIcon icon={faBookmark} />
          <span>About Me</span>
        </button>
        <button onClick={() => goToPage(3)}>
          <FontAwesomeIcon icon={faBookmark} />
          <span>Projects</span>
        </button>
        <button onClick={() => goToPage(4)}>
          <FontAwesomeIcon icon={faBookmark} />
          <span>Work Experience</span>
        </button>
        <button onClick={() => goToPage(5)}>
          <FontAwesomeIcon icon={faBookmark} />
          <span>Contact</span>
        </button>
      </div>
    </main>
  );
}