"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FiGithub, FiLinkedin, FiInstagram, FiLink, FiMail } from 'react-icons/fi';
import { TbArrowUpRight } from "react-icons/tb";
import Link from "next/link";
import useTypewriter from 'react-typewriter-hook';

// building...
const magicWords = [
  "something neat.",
  "with CoT reasoning.",
  "lego set 10281 from the loml <3",
  "a bot that merges PRs by rolling dice.",
];

type ProjectType = {
  name: string;
  description: string;
  tags: string[];
  link: string;
  imageUrl?: string;
  links?: { url: string; text: string }[];
  date?: string;
};

const experiences: ProjectType[] = [];
const projects: ProjectType[] = [];

type ProjectCardProps = {
  project: ProjectType;
  onEnter: (name: string) => void;
  onLeave: () => void;
  isHovered: boolean;
  anyCardHovered: boolean;
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
            <div className="project-date min-w-[200px] text-right pr-6 text-sm text-gray-400">{project.date}</div>
          ) : null}

          <div className="project-card-details">
            <Link legacyBehavior href={project.link} passHref>
              <a target="_blank" rel="noopener noreferrer" className="project-card-link">
                <div className="project-title-wrapper">
                  <h3 className="project-title text font-bold">
                    {project.name}
                  </h3>
                  <TbArrowUpRight className="arrow-icon" />
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

export default function Home() {
  const [index, setIndex] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const magicWord = magicWords[index];
  const typewriting = useTypewriter(magicWord);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const anyCardHovered = hoveredProject !== null;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = contentContainerRef.current?.scrollTop;
      if (scrollPosition !== undefined) {
        setActiveSection(null);
      }
    };

    const container = contentContainerRef.current;
    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  const scrollToRef = (ref: React.RefObject<HTMLElement>) => {
    if (contentContainerRef.current && ref.current) {
      const scrollPosition = ref.current.offsetTop - 40;
      contentContainerRef.current.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (typewriting === magicWord) {
      setIsTypingDone(true);
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % magicWords.length);
        setIsTypingDone(false);
      }, 2300);

      return () => clearTimeout(timeout);
    }
  }, [typewriting, magicWord, magicWords.length]);

  return (
    <div className="flex h-[calc(100dvh)] overflow-auto custom-bg-gradient items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 fade-in-element">Aarush Kukreja</h1>
        <h2 className="text-xl mb-5 fade-in-element">
          CS @ <span className="font-bold">Princeton</span>
        </h2>
        <p className="mb-6 fade-in-element">
          Building {typewriting}
          <span className={`blinking-cursor teal-glow ${isTypingDone ? 'fading' : ''}`}>|</span>
        </p>
        <div className="social-links flex space-x-4 mt-8 justify-center">
          <div className="social-link-wrapper fade-in-element">
            <Link legacyBehavior href="https://github.com/aarush-kukreja" passHref>
              <a className="social-icon" aria-label="GitHub">
                <FiGithub size={20} />
                <span className="icon-line"></span>
              </a>
            </Link>
          </div>
          <div className="social-link-wrapper fade-in-element">
            <Link legacyBehavior href="https://x.com/4aru5h" passHref>
              <a className="social-icon" aria-label="X">
                <FaXTwitter size={20} />
                <span className="icon-line"></span>
              </a>
            </Link>
          </div>
          <div className="social-link-wrapper fade-in-element">
            <Link legacyBehavior href="https://linkedin.com/in/aarush-kukreja" passHref>
              <a className="social-icon" aria-label="Linkedin">
                <FiLinkedin size={20} />
                <span className="icon-line"></span>
              </a>
            </Link>
          </div>
          <div className="social-link-wrapper fade-in-element">
            <Link legacyBehavior href="https://instagram.com/aarushkukreja" passHref>
              <a className="social-icon" aria-label="Instagram">
                <FiInstagram size={20} />
                <span className="icon-line"></span>
              </a>
            </Link>
          </div>
          <div className="social-link-wrapper fade-in-element">
            <a href="mailto:aarush.kukreja@princeton.edu" className="social-icon" aria-label="Email">
              <FiMail size={20} />
              <span className="icon-line"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

