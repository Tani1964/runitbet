import React, { useState, useEffect } from 'react';
import WelcomeVideo from "../Assets/videos/welcomeVideo.mp4";
import acsis from "../Assets/logos/acsisLogo.jpeg";
import henley from "../Assets/logos/Henley.jpeg"

const Welcome = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Innovative Software Solutions";
  
  // Typing animation effect
  useEffect(() => {
    if (isVideoLoaded) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
      
      return () => clearInterval(typingInterval);
    }
  }, [isVideoLoaded]);

  return (
    <header className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* Loading state before video loads */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 z-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-10">
        <video 
          className="object-cover w-full h-full" 
          autoPlay 
          loop 
          muted 
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={WelcomeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient overlay for better text visibility and visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>
      
      {/* Content area */}
      <div className={`relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Animated subtitle */}
        <div className="mb-3">
          <span className="inline-block px-4 py-1 bg-blue-700/80 text-white text-sm font-medium rounded-full backdrop-blur-sm">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>
        </div>
        
        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Digital Vision</span> Into Reality
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
          We craft cutting-edge software solutions that empower businesses to thrive in the digital landscape.
        </p>
        
        {/* CTA buttons with enhanced styling */}
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <a href="#contact" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-800 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          
          <a href="#features" className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-300 border border-white/30 hover:border-white/50">
            <span className="relative z-10">Explore Services</span>
          </a>
        </div>
        
        {/* Client logos/trust indicators */}
        <div className="mt-16 hidden md:block">
          <p className="text-white/70 text-sm mb-4">TRUSTED BY INNOVATIVE COMPANIES</p>
          <div className="flex justify-center items-center space-x-8">
            {/* Replace with actual client logos */}
            <img src={acsis} alt="Client Logo 1" width={100} height={50} className="h-14 w-auto bg-transparent" />
            <img src={henley} alt="Client Logo 1" width={100} height={50} className="h-14 w-auto" />
            {/* <div className="h-8 w-20 bg-white/20 rounded"></div>
            <div className="h-8 w-28 bg-white/20 rounded"></div>
            <div className="h-8 w-24 bg-white/20 rounded"></div> */}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator with improved animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 space-y-2 text-center z-20">
        <span className="text-white/70 text-sm block">Scroll to discover</span>
        <div className="w-px h-8 bg-white/50 mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-white animate-[scrollDown_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute top-10 right-10 w-32 h-32 border border-white/10 rounded-full z-10 hidden lg:block"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 border border-white/10 rounded-full z-10 hidden lg:block"></div>
    </header>
  );
};

export default Welcome;