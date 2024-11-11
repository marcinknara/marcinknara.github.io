import React, { useEffect, useRef, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Vara from 'vara';
import './App.css';

function App() {
  const isVaraInitialized = useRef(false);
  const [isVaraAnimationComplete, setIsVaraAnimationComplete] = useState(false);
  const [typewriterFontSize, setTypewriterFontSize] = useState(48);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false); // State for About modal

  const toggleAboutModal = () => {
    setIsAboutModalOpen(!isAboutModalOpen);
  };

  const calculateFontSize = () => {
    const screenFontSize = window.screen.width < 700 ? 32 : window.screen.width < 1200 ? 56 : 72;
    setTypewriterFontSize(screenFontSize);
    return screenFontSize;
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // UseEffect hook for the Vara animation
  useEffect(() => {
    if (!isVaraInitialized.current) {
      isVaraInitialized.current = true;
      const fontSize = calculateFontSize();

      const vara = new Vara(
        "#myName",
        "https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Satisfy/SatisfySL.json",
        [
          {
            text: "My name is Marcin Knara",
            y: 50,
            fromCurrentPosition: { y: false },
            duration: 3000,
          },
        ],
        {
          strokeWidth: 2,
          color: "#F4F4F4",
          fontSize: fontSize,
          textAlign: "center",
        }
      );

      vara.ready(() => {
        vara.animationEnd(() => {
          setIsVaraAnimationComplete(true);
        });
      });

      window.addEventListener('resize', calculateFontSize);

      // Clean up the event listener on unmount
      return () => window.removeEventListener('resize', calculateFontSize);
    }
  }, []);

  return (
    <div className="App">
      {/* Header Section */}
      <header>
        <nav className="navbar">
          <div className="logo">
            {/* Marcin Knara */}
          </div>

          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#about" onClick={toggleAboutModal}>About</a></li> {/* About modal link */}
            <li><a href="#contact" onClick={toggleModal}>Contact</a></li> {/* Contact modal link */}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          {/* Profile Photo */}
          <img
            src={`${process.env.PUBLIC_URL}/images/MarcinHeadshot.png`}
            alt="Profile of Marcin Knara"
            className="profile-photo"
          />
          <h1 id="myName">{isVaraAnimationComplete && (
            <div style={{ fontSize: `${typewriterFontSize / 2}px`, color: '#F4F4F4', marginTop: '10px' }}>
              <Typewriter
                words={['[Pronounced Mar-chin Ck-nara]', 'Welcome to my site!', 'Scroll and take a look around (work in progress).']}
                loop={1}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </div>
          )}</h1>
        </div>
      </section>

      {/* Modal for Contact Info */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Contact Information</h2>
            <p>Email: marcinknara@gmail.com</p>
            <p>LinkedIn: <a href="https://linkedin.com/in/marcinknara" target="_blank" rel="noopener noreferrer">linkedin.com/in/marcinknara</a></p>
            <p>GitHub: <a href="https://github.com/marcinknara" target="_blank" rel="noopener noreferrer">github.com/marcinknara</a></p>
            <button className="close-button" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}

      {/* Modal for About */}
      {isAboutModalOpen && (
        <div className="modal-overlay" onClick={toggleAboutModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: 'white' }}>More About Me</h2>

            {/* Bio Section */}
            <section>
              <h3>Bio</h3>
              <p>I'm a software engineer with over 3 years of professional experience! My primary work is on the backend, but I've done full stack work for a startup and continue to develop personal projects on the side.</p>
            </section>

            {/* Hobbies Section */}
            <section>
              <h3>Hobbies</h3>
              <p>Photography, Videography, Video games, Bike riding, Working out</p>
            </section>

            {/* Books Section */}
            <section>
              <h3>Books</h3>
              <p>Favorites: Dark Matter, Dune series, Hitchhiker's Guide to the Galaxy</p>
              <p>Currently Reading:  Spring Start Here, Sapiens, Angels & Demons</p>
              <p>Wants: The Pragmatic Programmer, Mythical Man Month, The Davinci Code (many more on GoodReads)</p>
            </section>

            <button className="close-button" onClick={toggleAboutModal}>Close</button>
          </div>
        </div>
      )}

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <h2>Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <img src={`${process.env.PUBLIC_URL}/images/saigelogo.png`} alt="Saige Project" />
            <h3>Saige</h3>
            <p>This was my first project working for a startup. I was the founding engineer for this mobile application.</p>
            <button className="view-more-btn">Sorry, no link.</button>
          </div>
          <div className="project-card">
            <img src={`${process.env.PUBLIC_URL}/images/FINEAS (1).png`} alt="Fineas Project" />
            <h3>Fineas</h3>
            <p>This is my current project. It is my attempt at creating a financial dashboard using Plaid to aggregate a user's financial data.</p>
            <a href="https://github.com/marcinknara/fineas" className="view-more-btn">View More</a>
          </div>
          <div className="project-card">
            <img src={`${process.env.PUBLIC_URL}/images/Poster.jpg`} alt="Podcast" />
            <h3>Let's Start a Dialogue Podcast</h3>
            <p>At the start of the COVID-19 pandemic, I scratched an itch to start my own podcast. I spoke with friends and professors on various topics, and greatly enjoyed these insightful conversations.</p>
            <a href="https://github.com/marcinknara/fineas" className="view-more-btn">View More</a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="social-icons">
          <a href="https://linkedin.com/in/marcinknara" target="_blank" rel="noopener noreferrer">
            {/* LinkedIn Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-label="LinkedIn">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.667 20h-2.667v-10h2.667v10zm-1.333-11.211c-.887 0-1.607-.72-1.607-1.607 0-.887.72-1.606 1.607-1.606.888 0 1.607.72 1.607 1.606 0 .887-.719 1.607-1.607 1.607zm13 11.211h-2.667v-5.333c0-1.271-.024-2.909-1.772-2.909-1.772 0-2.043 1.383-2.043 2.811v5.431h-2.667v-10h2.561v1.379h.036c.356-.675 1.227-1.386 2.527-1.386 2.702 0 3.2 1.778 3.2 4.092v5.915z" />
            </svg>
          </a>
          <a href="https://github.com/marcinknara" target="_blank" rel="noopener noreferrer">
            {/* GitHub Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-label="GitHub">
              <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.599.111.793-.261.793-.577 0-.285-.011-1.04-.016-2.043-3.338.724-4.042-1.41-4.042-1.41-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729 1.205.084 1.839 1.236 1.839 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.761-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.22-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.553 3.295-1.23 3.295-1.23.655 1.653.242 2.873.119 3.176.77.839 1.234 1.909 1.234 3.22 0 4.609-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.221 0 1.604-.014 2.896-.014 3.289 0 .32.192.694.801.576 4.763-1.588 8.195-6.084 8.195-11.385 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
        <p>&copy; 2024 Marcin Knara</p>
      </footer>
    </div>
  );
}

export default App;