
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FiGithub, FiLinkedin, FiInstagram, FiLink, FiMail } from 'react-icons/fi';

import { TbArrowUpRight } from "react-icons/tb";
import Link from "next/link";
import useTypewriter from 'react-typewriter-hook';


const magicWords = [
  "platforms that connect people.",
  "predictive analysis models.",
  "algorithms for financial modeling.",
  "full-stack projects for social impact.",
  "tools for quantitative finance.",
  "legos. :)",
];

type ProjectType = {
  name: string;
  description: string;
  tags: string[];
  link: string;
  imageUrl?: string; // Optional image URL
  links?: { url: string; text: string }[]; // Array of link objects
  date?: string; // Optional date field
};

const experiences: ProjectType[] = [
  {
    name: 'Researcher · Caltech SSPP',
    description: 'Worked on Caltech’s energy delivery plan with space solar power satellites. Presented at NASA, IEEE, and the European Space Agency.',
    tags: ['MATLAB', 'Python', 'SQL', 'Java'],
    link: 'https://www.spacesolar.caltech.edu/',
    links: [
      { url: 'https://www.techrxiv.org/articles/preprint/Investigating_the_Optimal_Use_Case_For_Space_Solar_Power_Systems/23935317', text: 'Publication · IEEE · Aug 15, 2023' },
      { url: 'https://ieeexplore.ieee.org/document/9926937', text: 'Publication · IEEE · Oct 14, 2022' }
    ],
    date: '2021 — 2023'
  },
  {
    name: 'Developer · MIT ESP',
    description: 'Optimized websites and stabilized web releases. Ensured smooth registration nationwide for Splash programs nationwide.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Typescript', 'CloudFlare JS', 'Amazon CloudFront', 'Microsoft Ajax', 'jQuery CDN', 'Ubuntu', 'VirtualBox'],
    link: 'https://esp.mit.edu/learn/index.html',
    date: '2021 — 2023'

  },
  {
    name: 'Researcher · Georgia Tech CCL',
    description: ' Built models to improve rocket fuel injection. Admitted to the Global Summit and Expo on Aerospace as the youngest researcher ever.',
    tags: ['Python', 'Tensorflow'],
    link: 'https://ccl.gatech.edu',
    date: '2022 — 2023'
  },

];

const projects: ProjectType[] = [
  {
    name: 'TurbulentBoids',
    description: 'Open-source software with 1M+ views. Recognized by PhDs, NASA scientists, Oxford biophysicists, and “Boids” algorithm creator Craig Reynolds.',
    tags: ['Python', 'Tensorflow', 'Scikit-Learn'],
    link: 'https://sites.google.com/view/turbulentboids/home/',
    imageUrl: 'https://repository-images.githubusercontent.com/548613832/88847080-2663-4f81-82f7-4a507aa3adba',
    links: [
      { url: 'https://github.com/aarush-kukreja/TurbulentBoids', text: 'GitHub' },
    ],
  },
  {
    name: 'Loading...',
    description: 'Something stealthy\'s cooking...',
    tags: ['...'],
    link: 'https://img.freepik.com/free-photo/3d-rendering-emotions_23-2149081943.jpg'
  },
  {
    name: 'Loading....',
    description: 'Something stealthy\'s cooking...',
    tags: ['...', '...'],
    link: 'https://img.freepik.com/free-photo/3d-rendering-emotions_23-2149081943.jpg'
  },
  {
    name: 'Loading.....',
    description: 'Something stealthy\'s cooking...',
    tags: ['...', '...', '...'],
    link: 'https://img.freepik.com/free-photo/3d-rendering-emotions_23-2149081943.jpg'
  },
];



// Define a type for the ProjectCard props
type ProjectCardProps = {
  project: ProjectType;
  onEnter: (name: string) => void;
  onLeave: () => void;
  isHovered: boolean;
  anyCardHovered: boolean; // New prop to indicate if any card is hovered
};


const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEnter,
  onLeave,
  isHovered,
  anyCardHovered,
}) => {
  const cardClass = isHovered ? 'bright' : anyCardHovered ? 'dim' : '';

  return (

    <div
      onMouseEnter={() => onEnter(project.name)}
      onMouseLeave={onLeave}
      className={`project-card ${cardClass}`}
    >
      <div className="project-card-content flex items-center">
        {project.imageUrl ? (
          <div className="project-image-container">
            <img src={project.imageUrl} alt={project.name} className="project-image" />
          </div>
        ) : project.date ? (
          <div className="project-date">{project.date}</div>
        ) : null}

        <div className="project-card-details">
          <Link legacyBehavior href={project.link} passHref>
            <a target="_blank" rel="noopener noreferrer" className="project-card-link">
              <div className="project-title-wrapper">
                <h3 className="project-title text font-bold">
                  {project.name}
                </h3>
                <TbArrowUpRight className="arrow-icon" /> {/* Arrow icon moved here */}
              </div>
            </a>
          </Link>

          <p className="project-description text-sm">
            {project.description}
          </p>
          <div className="tag-container flex flex-wrap mt-2">
            {project.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>

          {project.links && (
            <div className="link-container flex flex-wrap">
              {project.links.map((link, index) => (
                <Link legacyBehavior href={link.url} key={index} passHref>
                  <a className="link-tag" target="_blank" rel="noopener noreferrer">
                    <FiLink className="icon-size" />
                    <span>{link.text}</span>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

  );
};


export function Component() {

  const [index, setIndex] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const magicWord = magicWords[index];
  const typewriting = useTypewriter(magicWord);
  const nowRef = useRef<HTMLHeadingElement>(null);
  const experienceRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLHeadingElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const anyCardHovered = hoveredProject !== null;


  useEffect(() => {
    const handleScroll = () => {
      const positions = {
        now: nowRef.current?.offsetTop,
        experience: experienceRef.current?.offsetTop,
        projects: projectsRef.current?.offsetTop,
      };

      const scrollPosition = contentContainerRef.current?.scrollTop;
      if (scrollPosition !== undefined) {
        if (positions.now !== undefined && scrollPosition >= positions.now - 100 && (positions.experience === undefined || scrollPosition < positions.experience - 100)) {
          setActiveSection('now');
        } else if (positions.experience !== undefined && scrollPosition >= positions.experience - 100 && (positions.projects === undefined || scrollPosition < positions.projects - 100)) {
          setActiveSection('experience');
        } else if (positions.projects !== undefined && scrollPosition >= positions.projects - 100) {
          setActiveSection('projects');
        } else {
          setActiveSection(null);
        }
      }
    };

    const container = contentContainerRef.current;
    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const renderMenu = () => {
    const menuItems = (
      <>
        <div className="menu-bar space-y-6" style={{ padding: '20px 0' }}>
          <div className={`menu-item ${activeSection === 'now' ? 'active' : ''}`}
            onClick={() => scrollToRef(nowRef)}>
            <span className="line"></span>
            <a className="menu-link cursor-pointer">Now</a>
          </div>
          <div className={`menu-item ${activeSection === 'experience' ? 'active' : ''}`}
            onClick={() => scrollToRef(experienceRef)}>
            <span className="line"></span>
            <a className="menu-link cursor-pointer">Experience</a>
          </div>
          <div className={`menu-item ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => scrollToRef(projectsRef)}>
            <span className="line"></span>
            <a className="menu-link cursor-pointer">Projects</a>
          </div>
        </div>
      </>
    );


    // Return the sidebar menu JSX
    return (
      <div className="sidebar fixed top-0 left-0 h-full p-10 w-1/3 space-y-4 z-10 backdrop-filter-blur-lg bg-opacity-50 bg-black">
        <h1 className="text-4xl font-bold mb-2">Aarush Kukreja</h1>
        <h2 className="text-xl mb-5">
          Undergrad @ <span className="font-bold text-teal-500">Princeton</span>
        </h2>
        <p className=" mb-6">
          Building {typewriting}
          <span className={`blinking-cursor ${isTypingDone ? 'fading' : ''}`}>|</span>
        </p>
        {menuItems}
        <div className="social-links flex space-x-4 mt-8"> {/* Increased margin-top */}
          <div className="social-link-wrapper">
            <Link legacyBehavior href="https://github.com/aarush-kukreja" passHref>
              <a className="social-icon" aria-label="GitHub">
                <FiGithub />
                <span className="icon-line"></span> {/* Vertical line */}
              </a>
            </Link>
          </div>
          <div className="social-link-wrapper">
            <Link legacyBehavior href="https://x.com/aarush_kukreja" passHref>
              <a className="social-icon" aria-label="X">
                <FaXTwitter />
                <span className="icon-line"></span> {/* Line under the icon */}
              </a>
            </Link>
          </div>
          <div className="social-link-wrapper">
            <Link legacyBehavior href="https://linkedin.com/in/aarush-kukreja" passHref>
              <a className="social-icon" aria-label="Linkedin">
                <FiLinkedin />
                <span className="icon-line"></span> {/* Line under the icon */}
              </a>
            </Link>
          </div>
          <div className="social-link-wrapper">
            <Link legacyBehavior href="https://instagram.com/aarushkukreja" passHref>
              <a className="social-icon" aria-label="Instagram">
                <FiInstagram />
                <span className="icon-line"></span> {/* Vertical line */}
              </a>
            </Link>
          </div>
          <div className="social-link-wrapper">
            <a href="mailto:aarush.kukreja@princeton.edu" className="social-icon" aria-label="Email">
              <FiMail />
              <span className="icon-line"></span> {/* Vertical line */}
            </a>
          </div>
        </div>
      </div>
    );

  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--cursorX', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursorY', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const menuBarThreshold = 1023; // Set your threshold here


  useEffect(() => {
    // Adjust the bottom padding of the content container
    const adjustPadding = () => {
      const availableHeight = window.innerHeight; // Get the viewport height
      const topPadding = 160; // Assuming pt-20 translates to 160px
      const bottomPadding = 40; // Assuming you want to balance it with 40px bottom padding

      if (contentContainerRef.current) {
        const currentScrollHeight = contentContainerRef.current.scrollHeight;
        if (currentScrollHeight + topPadding + bottomPadding > availableHeight) {
          // If the content overflows the available height, adjust the bottom padding
          contentContainerRef.current.style.paddingBottom = `${bottomPadding}px`;
        }
      }
    };

    // Call the function on mount and window resize
    adjustPadding();
    window.addEventListener('resize', adjustPadding);

    return () => {
      window.removeEventListener('resize', adjustPadding);
    };
  }, []);

  const scrollToRef = (ref: React.RefObject<HTMLElement>) => {
    if (contentContainerRef.current && ref.current) {
      const scrollPosition = ref.current.offsetTop - 40;
      contentContainerRef.current.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    const positions = {
      now: nowRef.current?.offsetTop,
      experience: experienceRef.current?.offsetTop,
      projects: projectsRef.current?.offsetTop,
      // Add more sections if needed
    };

    const scrollPosition = contentContainerRef.current?.scrollTop;
    if (scrollPosition !== undefined) {
      if (positions.now !== undefined && scrollPosition >= positions.now - 100 && (positions.experience === undefined || scrollPosition < positions.experience - 100)) {
        setActiveSection('now');
      } else if (positions.experience !== undefined && scrollPosition >= positions.experience - 100 && (positions.projects === undefined || scrollPosition < positions.projects - 100)) {
        setActiveSection('experience');
      } else if (positions.projects !== undefined && scrollPosition >= positions.projects - 100) {
        setActiveSection('projects');
      } else {
        setActiveSection(null);
      }
    }
  };

  useEffect(() => {
    const container = contentContainerRef.current;
    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    if (typewriting === magicWord) {
      setIsTypingDone(true); // Typing done, set state to true
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % magicWords.length);
        setIsTypingDone(false); // Reset for the next word
      }, 2300);

      return () => clearTimeout(timeout);
    }
  }, [typewriting, magicWord, magicWords.length]);

  return (
    <div className="flex h-screen overflow-hidden custom-bg-gradient">
      {/* Adjust the width class here, for example from w-1/3 to w-1/2 */}
      {renderMenu()}

      {/* right hand side */}
      <div
        ref={contentContainerRef}
        className="flex flex-col ml-auto content-width pt-10 overflow-y-scroll content-padding custom-scrollbar"
      >

        <div className="personal-info md:hidden">
          <h1 className="font-bold text-4xl mb-2">Aarush Kukreja</h1>
          <h2 className="text-xl mb-5">
            Undergrad @ <span className="font-bold text-teal-500">Princeton</span>
          </h2>
          <p className=" text-xs mb-6">
            Building {typewriting}
            <span className={`blinking-cursor ${isTypingDone ? 'fading' : ''}`}>|</span>
          </p>

          <div className="social-links  space-x-4 mt-9 mb-9"> {/* Increased margin-top */}
            <div className="social-link-wrapper">
              <Link legacyBehavior href="https://github.com/aarush-kukreja" passHref>
                <a className="social-icon" aria-label="GitHub">
                  <FiGithub />
                  <span className="icon-line"></span> {/* Vertical line */}
                </a>
              </Link>
            </div>
            <div className="social-link-wrapper">
              <Link legacyBehavior href="https://x.com/aarush_kukreja" passHref>
                <a className="social-icon" aria-label="X">
                  <FaXTwitter />
                  <span className="icon-line"></span> {/* Line under the icon */}
                </a>
              </Link>
            </div>
            <div className="social-link-wrapper">
              <Link legacyBehavior href="https://linkedin.com/in/aarush-kukreja" passHref>
                <a className="social-icon" aria-label="Linkedin">
                  <FiLinkedin />
                  <span className="icon-line"></span> {/* Line under the icon */}
                </a>
              </Link>
            </div>
            <div className="social-link-wrapper">
              <Link legacyBehavior href="https://instagram.com/aarushkukreja" passHref>
                <a className="social-icon" aria-label="Instagram">
                  <FiInstagram />
                  <span className="icon-line"></span> {/* Vertical line */}
                </a>
              </Link>
            </div>
            <div className="social-link-wrapper">
              <a href="mailto:aarush.kukreja@princeton.edu" className="social-icon" aria-label="Email">
                <FiMail />
                <span className="icon-line"></span> {/* Vertical line */}
              </a>
            </div>

          </div>
        </div>


        <h2 ref={nowRef} className="text-xl font-bold mb-2" id="about">Now</h2>
        <p className="text mb-2" style={{ paddingLeft: '25px' }}>
          {"\n Pursuing a Bachelor's degree in Computer Science. Studying AutoML, neural networks, and GenAI. Involved in Princeton Blockchain, AI Alignment, and Entrepreneurship. Leaving things better than I found them."
            .split('\n')
            .map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </p>

        <h2 ref={experienceRef} className="text-xl font-bold mb-2 mt-8">Experience</h2>
        <div className="project-cards-container ">
          {experiences.map((experience) => (
            <ProjectCard
              key={experience.name}
              project={experience}
              onEnter={setHoveredProject}
              onLeave={() => setHoveredProject(null)}
              isHovered={hoveredProject === experience.name}
              anyCardHovered={anyCardHovered}
            />
          ))}
        </div>


        <h2 ref={projectsRef} className="text-xl font-bold mb-2 mt-8">Projects</h2>
        <div className="project-cards-container ">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              onEnter={setHoveredProject}
              onLeave={() => setHoveredProject(null)}
              isHovered={hoveredProject === project.name}
              anyCardHovered={anyCardHovered}
            />
          ))}
        </div>

        <div className="flex items-center ml-3 h-screen">
          <h2 className="text-xs mt-20">
            Built with <a href="https://nextjs.org/" className="faded-hover-link">Next.js</a> and <a href="https://tailwindcss.com/" className="faded-hover-link">Tailwind CSS</a>, deployed with <a href="https://vercel.com/" className="faded-hover-link">Vercel</a>, and coded in <a href="https://code.visualstudio.com/" className="faded-hover-link cursor-pointer">Visual Studio Code</a>. All work by Aarush Kukreja.
          </h2>
        </div>


      </div>
    </div>
  )
}
