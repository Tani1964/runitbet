import { useState, useEffect, useRef } from 'react';
import acsisDash from "../Assets/screenshots/acsisdash.jpeg";
import acsisMobile from "../Assets/screenshots/acsismobile.jpeg";
import runamMobile from "../Assets/screenshots/runamMobile.png";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

const PortfolioCardStack = () => {
  // Register the plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Create refs for the container and section
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  
  // Sample portfolio projects
  const initialProjects = [
    {
      id: 0,
      title: "Our Portfolio",
      description: "Explore our diverse portfolio showcasing innovative solutions across various industries. Each project reflects our commitment to quality and excellence.",
      image: "",
      tech: [],
      client: "",
      isCover: true
    },
    {
      id: 1,
      title: "Admin Dashboard",
      description: "A robust admin dashboard for an event platform, featuring real-time inventory management, event tracking, awards, and secure voting processing. Built for scalability and optimized for performance.",
      image: acsisDash,
      tech: ["React", "Node.js", "PostgreSQL", "AWS"],
      client: "African Caribbean Investment Summit"
    },
    {
      id: 2,
      title: "Mobile Event App",
      description: "An interactive mobile application for managing large-scale events, including agendas, speaker profiles, live updates, and user engagement features. Designed for a seamless experience during conferences and summits.",
      image: acsisMobile,
      tech: ["React Native", "Node.js", "PostgreSQL", "AWS"],
      client: "African Caribbean Investment Summit"
    },
    {
      id: 3,
      title: "Human Services Delivery App",
      description: "A mobile-first platform enabling users to access essential human services with ease. Includes real-time tracking, service provider matching, and secure communication. Designed for reliability in underserved communities.",
      image: runamMobile,
      tech: ["Flutter", "Django", "MongoDB", "Render"],
      client: "RUN AM"
    },
    {
      id: 4,
      title: "Let's Work Together",
      description: "Ready to transform your ideas into reality? Our team of experts is eager to collaborate on your next project.",
      image: "",
      tech: [],
      client: "",
      isEndPage: true
    }
  ];
  
  const [projects] = useState(initialProjects);

  // Set up GSAP animations after component mounts
  useEffect(() => {
    // Make sure refs are available
    if (!containerRef.current || !sectionRef.current) return;
    
    // Use class for portfolio cards
    const cards = gsap.utils.toArray(".portfolio-card");
    const totalCards = cards.length;
    
    // Calculate the total travel distance based on the number of cards
    const totalDistance = totalCards * 100;
    
    // Create the animation with better ScrollTrigger configuration
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // Start at the top of the viewport
        end: `+=${totalDistance}%`, // End after scrolling the calculated distance
        pin: true, // Pin the section
        anticipatePin: 1, // Smoother pinning
        scrub: 1, // Smooth scrubbing
        snap: {
          snapTo: 1 / (totalCards - 1),
          duration: { min: 1, max: 2 },
          delay: 0.1
        },
        // This ensures the section takes up the correct amount of space in the document flow
        pinSpacing: true,
        // markers: true // Remove in production
      }
    });
    
    // Add the horizontal scroll animation to the timeline
    tl.to(cards, {
      xPercent: -100 * (totalCards - 1),
      ease: "none"
    });
    
    // Add animation for elements in the cover slide
    gsap.fromTo(".cover-title", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
    
    gsap.fromTo(".cover-description", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8 }
    );
    
    gsap.fromTo(".cover-cta", 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, delay: 1.2 }
    );
    
    gsap.fromTo(".cover-graphic path", 
      { strokeDashoffset: 300, strokeDasharray: 300 },
      { strokeDashoffset: 0, duration: 2, delay: 0.3, stagger: 0.1 }
    );

    // Create scroll-triggered animations for the end page
    const endPageTrigger = {
      trigger: ".end-page",
      start: "center bottom",
      toggleActions: "play none none reverse"
    };

    // End page animations that will trigger when scrolled to
    gsap.fromTo(".end-title", 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: endPageTrigger 
      }
    );

    gsap.fromTo(".end-description", 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: endPageTrigger 
      }
    );

    gsap.fromTo(".contact-button", 
      { opacity: 0, scale: 0.9 }, 
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5,
        delay: 0.5,
        scrollTrigger: endPageTrigger 
      }
    );

    gsap.fromTo(".end-graphic", 
      { opacity: 0, scale: 0.8 }, 
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1,
        delay: 0.3,
        scrollTrigger: endPageTrigger 
      }
    );

    gsap.fromTo(".service-item", 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        stagger: 0.1,
        delay: 0.6,
        scrollTrigger: endPageTrigger 
      }
    );
    
    // Cleanup on unmount
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="portfolio-section w-full relative" style={{ overflow: "hidden" }}>
      {/* This wrapper gives vertical space for the horizontal scroll to occur */}
      <div style={{ height: `${100 * (projects.length+1)}vh` }}>
        {/* Container for horizontal scroll */}
        <div
          ref={containerRef}
          className="flex flex-nowrap h-screen sticky top-0"
          id="portfolio-container"
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className={`portfolio-card min-w-full h-screen flex-shrink-0 relative ${project.isCover ? 'cover-card' : ''} ${project.isEndPage ? 'end-page' : ''}`}
            >
              {project.isCover ? (
                // Cover Card Design
                <div className="relative w-full h-full bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
                  {/* Abstract shapes */}
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                    <svg className="cover-graphic absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.5" />
                      <path d="M0,30 Q35,50 70,20 T100,40" fill="none" stroke="white" strokeWidth="0.5" />
                      <path d="M0,70 Q50,40 65,70 T100,60" fill="none" stroke="white" strokeWidth="0.5" />
                      <circle cx="80" cy="20" r="5" fill="rgba(255,255,255,0.2)" />
                      <circle cx="20" cy="80" r="7" fill="rgba(255,255,255,0.2)" />
                      <circle cx="65" cy="60" r="3" fill="rgba(255,255,255,0.2)" />
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col justify-center items-center h-full px-4 sm:px-8 text-white z-10 relative">
                    <div className="max-w-3xl mx-auto text-center">
                      <h2 className="cover-title text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
                        Our <span className="text-blue-300">Portfolio</span>
                      </h2>
                      
                      <p className="cover-description text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
                        Explore our diverse collection of innovative solutions that have transformed businesses across industries. Each project represents our commitment to excellence and cutting-edge technology.
                      </p>
                      
                      <div className="cover-cta flex items-center justify-center">
                        <div className="inline-flex items-center bg-white bg-opacity-10 text-white border border-white border-opacity-30 rounded-full px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
                          <span className="font-medium text-sm sm:text-base">Scroll to explore</span>
                          <svg className="ml-2 animate-bounce" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 text-center text-xs sm:text-sm font-light text-white text-opacity-60">
                        <p>Swipe or scroll to navigate through projects</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : project.isEndPage ? (
                // End Page Design
                <div className="relative w-full h-full bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
                  {/* Abstract background pattern */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="end-graphic absolute inset-0 opacity-20">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.2" opacity="0.3" />
                          </pattern>
                          <radialGradient id="fadeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                        <circle cx="50" cy="50" r="40" fill="url(#fadeGradient)" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Content Container */}
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Left Column */}
                      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start px-6 md:px-12 lg:px-16 py-10 md:py-0 text-white">
                        <div className="max-w-xl">
                          <h2 className="end-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-center md:text-left">
                            Let's <span className="text-blue-300">Create</span> Together
                          </h2>
                          
                          <p className="end-description text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed text-center md:text-left">
                            Ready to bring your vision to life? Our team of experts specializes in delivering cutting-edge solutions tailored to your unique needs.
                          </p>
                          
                          <div className="mt-2 mb-8 md:mb-10 space-y-3 hidden md:block">
                            <h3 className="text-xl font-semibold mb-3">Our Services</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="service-item flex items-center space-x-2">
                                <svg className="w-5 h-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Web Development</span>
                              </div>
                              <div className="service-item flex items-center space-x-2">
                                <svg className="w-5 h-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Mobile Applications</span>
                              </div>
                              <div className="service-item flex items-center space-x-2">
                                <svg className="w-5 h-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>UI/UX Design</span>
                              </div>
                              <div className="service-item flex items-center space-x-2">
                                <svg className="w-5 h-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Cloud Solutions</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-center md:justify-start">
                            <a href='#contact'>
                            <button className="contact-button px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-lg">
                              Contact Us
                            </button></a>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Column - Visible only on MD+ screens */}
                      <div className="hidden md:flex w-1/2 items-center justify-center p-12">
                        <div className="end-graphic relative w-full max-w-lg aspect-square">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            <defs>
                              <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
                              </linearGradient>
                            </defs>
                            
                            {/* Grid background */}
                            <path d="M0,40 L200,40 M0,80 L200,80 M0,120 L200,120 M0,160 L200,160 
                                   M40,0 L40,200 M80,0 L80,200 M120,0 L120,200 M160,0 L160,200" 
                                  stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
                            
                            {/* Central design element */}
                            <circle cx="100" cy="100" r="60" fill="url(#circleGradient)" />
                            
                            {/* Code brackets design */}
                            <path d="M60,70 L40,100 L60,130" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M140,70 L160,100 L140,130" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            
                            {/* Connected dots */}
                            <circle cx="70" cy="180" r="5" fill="#60A5FA" />
                            <circle cx="100" cy="180" r="5" fill="#60A5FA" />
                            <circle cx="130" cy="180" r="5" fill="#60A5FA" />
                            <line x1="70" y1="180" x2="100" y2="180" stroke="#60A5FA" strokeWidth="2" />
                            <line x1="100" y1="180" x2="130" y2="180" stroke="#60A5FA" strokeWidth="2" />
                            
                            {/* Tech-inspired elements */}
                            <rect x="85" y="85" width="30" height="30" rx="2" fill="white" fillOpacity="0.2" />
                            <circle cx="100" cy="100" r="8" fill="white" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile service section - Only visible on smaller screens */}
                    <div className="px-6 pt-0 pb-10 md:hidden">
                      <h3 className="text-xl font-semibold mb-3 text-white text-center">Our Services</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="service-item flex items-center space-x-2 text-white">
                          <svg className="w-5 h-5 text-blue-300 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Web Development</span>
                        </div>
                        <div className="service-item flex items-center space-x-2 text-white">
                          <svg className="w-5 h-5 text-blue-300 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Mobile Apps</span>
                        </div>
                        <div className="service-item flex items-center space-x-2 text-white">
                          <svg className="w-5 h-5 text-blue-300 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">UI/UX Design</span>
                        </div>
                        <div className="service-item flex items-center space-x-2 text-white">
                          <svg className="w-5 h-5 text-blue-300 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Cloud Solutions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Regular Project Cards
                <>
                  {/* Image as background */}
                  <div className="absolute inset-0 w-full h-full">
                    {project.image && (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  </div>
      
                  {/* Content overlay */}
                  <div className="relative z-10 flex flex-col justify-center items-center h-full p-4 sm:p-8 text-white">
                    <div className="max-w-2xl mx-auto text-center">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{project.title}</h3>
                      <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">{project.description}</p>
                      {project.client && <p className="text-sm sm:text-md font-medium mb-3 sm:mb-4">Client: {project.client}</p>}
                      <div className="flex flex-wrap justify-center gap-2 mt-3 sm:mt-4">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="bg-blue-500 bg-opacity-30 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioCardStack;