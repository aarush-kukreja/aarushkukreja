"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FiGithub, FiLinkedin, FiInstagram, FiLink, FiMail } from 'react-icons/fi';

import { TbArrowUpRight } from "react-icons/tb";
import Link from "next/link";
import useTypewriter from 'react-typewriter-hook';


const magicWords = [
  "platforms that connect people.",
  "with LMs.",
  "projects for social impact.",
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
      { url: 'https://www.techrxiv.org/articles/preprint/Investigating_the_Optimal_Use_Case_For_Space_Solar_Power_Systems/23935317', text: 'Preprint · IEEE · Aug 15, 2023' },
      { url: 'https://ieeexplore.ieee.org/document/9926937', text: 'Publication · IEEE · Oct 14, 2022' }
    ],
    date: '2021 — 2023'
  },
  {
    name: 'Developer · MIT ESP',
    description: 'Optimized websites and stabilized web releases. Ensured smooth registration for Splash programs nationwide.',
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
    name: 'EcoSmart City Planner',
    description: 'AI-powered urban planning tool for sustainable city development, optimizing energy usage and green spaces.',
    tags: ['Python', 'TensorFlow', 'GIS'],
    imageUrl: 'https://cdn.prod.website-files.com/62792c49f89cb381b3affec5/64f4af61a202a74777319727_Untitled%20design%20-%202023-09-03T180745.214.png',
    link: 'https://github.com/aarush-kukreja/ecosmart-city-planner'
  },
  {
    name: 'ClimateRAG',
    description: 'Retrieval-Augmented Generation system for climate change research, providing up-to-date information from scientific papers.',
    tags: ['PyTorch', 'Transformers', 'Elasticsearch'],
    imageUrl: 'data:image/jpeg;base64,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',
    link: 'https://github.com/aarush-kukreja/climate-rag'
  },
  {
    name: 'GreenEnergy Forecaster',
    description: 'Machine learning model for predicting renewable energy production, helping grid operators optimize energy distribution.',
    tags: ['Scikit-learn', 'Pandas', 'Prophet'],
    imageUrl: 'https://media.licdn.com/dms/image/D4D12AQGGcF04o6LTdw/article-cover_image-shrink_600_2000/0/1710529188120?e=2147483647&v=beta&t=Ou1lukSsYtid5FqVJZzfFEZgiWL8fbQyc74t1ZGqeaQ',
    link: 'https://github.com/aarush-kukreja/green-energy-forecaster'
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
    <div className="fade-in-element">
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
          <div className={`menu-item fade-in-element ${activeSection === 'now' ? 'active' : ''}`}
            onClick={() => scrollToRef(nowRef)}>
            <span className="line"></span>
            <a className="menu-link cursor-pointer">Now</a>
          </div>
          <div className={`menu-item fade-in-element ${activeSection === 'experience' ? 'active' : ''}`}
            onClick={() => scrollToRef(experienceRef)}>
            <span className="line"></span>
            <a className="menu-link cursor-pointer">Experience</a>
          </div>
          <div className={`menu-item fade-in-element ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => scrollToRef(projectsRef)}>
            <span className="line"></span>
            <a className="menu-link cursor-pointer">Projects</a>
          </div>
        </div>
      </>
    );


    // Return the sidebar menu JSX
    return (
      <div className="sidebar fixed top-0 left-0 h-full p-10 w-1/3 space-y-4 z-10 backdrop-filter-blur-lg bg-opacity-50 bg-black ">
        <h1 className="text-4xl font-bold mb-2 fade-in-element">Aarush Kukreja</h1>
        <h2 className="text-xl mb-5 fade-in-element">
          Undergrad @ <span className="font-bold text-teal-500">Princeton</span>
        </h2>
        <p className=" mb-6 fade-in-element">
          Building {typewriting}
          <span className={`blinking-cursor ${isTypingDone ? 'fading' : ''}`}>|</span>
        </p>
        {menuItems}
        <div className="social-links flex space-x-4 mt-8"> {/* Increased margin-top */}
          <div className="social-link-wrapper fade-in-element">
            <Link legacyBehavior href="https://github.com/aarush-kukreja" passHref>
              <a className="social-icon" aria-label="GitHub">
                <FiGithub />
                <span className="icon-line"></span> {/* Vertical line */}
              </a>
            </Link>
          </div>
          <div className="social-link-wrapper fade-in-element">
            <Link legacyBehavior href="https://x.com/aarush_kukreja" passHref>
              <a className="social-icon" aria-label="X">
                <FaXTwitter />
                <span className="icon-line"></span> {/* Line under the icon */}
              </a>
            </Link>
          </div>
          <div className="social-link-wrapper fade-in-element">
            <Link legacyBehavior href="https://linkedin.com/in/aarush-kukreja" passHref>
              <a className="social-icon" aria-label="Linkedin">
                <FiLinkedin />
                <span className="icon-line"></span> {/* Line under the icon */}
              </a>
            </Link>
          </div>
          <div className="social-link-wrapper fade-in-element">
            <Link legacyBehavior href="https://instagram.com/aarushkukreja" passHref>
              <a className="social-icon" aria-label="Instagram">
                <FiInstagram />
                <span className="icon-line"></span> {/* Vertical line */}
              </a>
            </Link>
          </div>
          <div className="social-link-wrapper fade-in-element">
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

    <div className="flex h-[calc(100dvh)] overflow-auto custom-bg-gradient ">
      {/* Adjust the width class here, for example from w-1/3 to w-1/2 */}
      <div className="menu-container">
        {renderMenu()}
      </div>


      {/* right hand side */}
      <div
        ref={contentContainerRef}
        className="flex flex-col ml-auto content-width pt-10 lg:overflow-y-auto content-padding custom-scrollbar"
      >

        <div className="personal-info md:hidden">
          <h1 className="font-bold text-4xl mb-2 fade-in-element">Aarush Kukreja</h1>
          <h2 className="text-xl mb-5 fade-in-element">
            Undergrad @ <span className="font-bold text-teal-500">Princeton</span>
          </h2>
          <p className=" text-xs mb-6 fade-in-element">
            Building {typewriting}
            <span className={`blinking-cursor ${isTypingDone ? 'fading' : ''}`}>|</span>
          </p>

          <div className="social-links  space-x-4 mt-9 mb-9 "> {/* Increased margin-top */}
            <div className="social-link-wrapper fade-in-element">
              <Link legacyBehavior href="https://github.com/aarush-kukreja" passHref>
                <a className="social-icon" aria-label="GitHub">
                  <FiGithub />
                  <span className="icon-line"></span> {/* Vertical line */}
                </a>
              </Link>
            </div>
            <div className="social-link-wrapper fade-in-element">
              <Link legacyBehavior href="https://x.com/aarush_kukreja" passHref>
                <a className="social-icon" aria-label="X">
                  <FaXTwitter />
                  <span className="icon-line"></span> {/* Line under the icon */}
                </a>
              </Link>
            </div>
            <div className="social-link-wrapper fade-in-element">
              <Link legacyBehavior href="https://linkedin.com/in/aarush-kukreja" passHref>
                <a className="social-icon" aria-label="Linkedin">
                  <FiLinkedin />
                  <span className="icon-line"></span> {/* Line under the icon */}
                </a>
              </Link>
            </div>
            <div className="social-link-wrapper fade-in-element">
              <Link legacyBehavior href="https://instagram.com/aarushkukreja" passHref>
                <a className="social-icon" aria-label="Instagram">
                  <FiInstagram />
                  <span className="icon-line"></span> {/* Vertical line */}
                </a>
              </Link>
            </div>
            <div className="social-link-wrapper fade-in-element">
              <a href="mailto:aarush.kukreja@princeton.edu" className="social-icon" aria-label="Email">
                <FiMail />
                <span className="icon-line"></span> {/* Vertical line */}
              </a>
            </div>

          </div>
        </div>

        <div className="now-container">
          <h2 ref={nowRef}
            className="text-xl font-bold mb-2 sticky top-0 z-20 mb-4 mt-4 bg-background/0 py-5 backdrop-blur md:sticky md:top-0 lg:relative lg:top-auto lg:w-full lg:py-0 fade-in-element"
            id="now">Now</h2>
          <p className="pl-6 mr-6 text mb-2 fade-in-element" >
            {"\n Building with AI in climate tech.\n"
              .split('\n')
              .map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
          </p>
        </div>

        <div className="project-cards-container">
          <h2 ref={experienceRef}
            className=" text-xl font-bold mb-2 sticky top-0 z-20 mb-4 mt-4 bg-background/0 py-5 backdrop-blur md:sticky md:top-0 lg:relative lg:top-auto lg:w-full lg:py-0 fade-in-element"
            id="experiences">Experience</h2>

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


        <div className="project-cards-container ">
          <h2 ref={projectsRef}
            className="text-xl font-bold mb-2 sticky top-0 z-20 mb-4 mt-4 bg-background/0 py-5 backdrop-blur md:sticky md:top-0 lg:relative lg:top-auto lg:w-full lg:py-0 fade-in-element"
            id="projects">Projects</h2>

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

        <div className="flex items-center ml-3 fade-in-element">
          <h2 className="text-xs mt-20">
            Built with <a href="https://nextjs.org/" className="faded-hover-link">Next.js</a> and <a href="https://tailwindcss.com/" className="faded-hover-link">Tailwind CSS</a>, deployed with <a href="https://vercel.com/" className="faded-hover-link">Vercel</a>, and coded in <a href="https://code.visualstudio.com/" className="faded-hover-link cursor-pointer">Visual Studio Code</a>. All work by Aarush Kukreja.
            {
              "\n\n\n\n\n".split('\n').map((line, index) => (
                <span key={index} className="block lg:hidden" style={{ userSelect: 'none' }}>
                  {line}
                  <br />
                </span>
              ))
            }



          </h2>
        </div>
      </div>
    </div>
  )
}

