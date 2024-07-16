// components/MyBook.js
import React, { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from "react-pageflip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

// TODO: to make this mobile friends, add resizing and a single page format (or landscape booklet)
// Example: https://codesandbox.io/s/cocky-lamarr-vjpng9?file=/src/components/HuhTest.vue
const MyBook = () => {
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

    return (
        <HTMLFlipBook
            ref={flipBookRef}
            width={dimensions.width}
            height={dimensions.height}
            className="flipbook"
        >
            <div className="contents pageLeft">
                <h1 className="pageHeader">Table of Contents:</h1>
                <p className="pageContent">
                    <ul>
                        <p><a href="#" onClick={() => goToPage(2)}>About Me</a></p>
                        <p><a href="#" onClick={() => goToPage(3)}>Projects</a></p>
                        <p><a href="#" onClick={() => goToPage(4)}>Work Experience</a></p>
                        <p><a href="#" onClick={() => goToPage(5)}>Contact Info</a></p>
                    </ul>
                </p>
            </div>
            <div className="page pageRight">
                <h1 className="pageHeader">How To:</h1>
                <p className="pageContent">
                    <ul>
                        <li>You can click the &#39;chapters&#39; in the table of contents to skip ahead in this booklet!</li>
                        <li>You can also click on the left and right &#39;pages&#39; of this component to flip through.</li>
                    </ul>
                </p>
            </div>
            <div className="page pageLeft">
                <h1 className="pageHeader">About Me</h1>
                <p className="pageContent">
                    Hi, my name is Marcin Knara (Mar-chin Ck-nara)!<br /><br />
                    Here are some of the things and activities I currently dabble in:
                    <ul className="aboutMeList">
                        <p>Web / Mobile Development</p>
                        <p>Photography & Videography</p>
                        <p>Writing</p>
                        <p>Armchair Philosophizing</p>
                        <p>Personal Finance</p>
                        <p>Playing Video Games</p>
                    </ul>
                </p>
            </div>
            <div className="page pageRight">
                <h1 className="pageHeader">Projects</h1>
                <p className="pageContent">
                    <ul className="aboutMeList">
                        <p>Fineas</p>
                        <p>Fineas is my first attempt at creating a financial services web application. Taking inspiration from the now decomissioned financial budgeting app Mint, I am hoping to create a budgeting tool that can help anyone track their finances with the help of Machine Learning.</p>
                    </ul>
                </p>
            </div>
            <div className="page pageLeft">
                <h1 className="pageHeader">Work Experience</h1>
                <p className="pageContent">This is the work experience section. It&#39;ll probably dispaly my resume or something.</p>
            </div>
            <div className="page pageRight">
                <h1 className="pageHeader">Contact Info</h1>
                <p className="pageContent">
                    You can reach me or checkout my other profiles at:<br /><br />
                    <p>
                        <a href="mailto:marcinknara@gmail.com">
                            <FontAwesomeIcon icon={faEnvelope} /> marcinknara@gmail.com
                        </a>
                    </p>
                    <p>
                        <a href="https://www.linkedin.com/in/marcinknara" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                        </a>
                    </p>
                    <p>
                        <a href="https://github.com/marcinknara" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} /> GitHub
                        </a>
                    </p>
                </p>
            </div>
        </HTMLFlipBook>
    );
};

export default MyBook;