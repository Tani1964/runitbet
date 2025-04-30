import React, { useState, useEffect, useCallback } from "react";
import { Box, Text, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

// Sample testimonials data - expanded with more details
const testimonials = [
  { 
    name: "David Roberts", 
    role: "Founder / Chairman at African Caribbean Sustainability & Investment Summit (ACSIS). In partnership with African Union Commission (AUC) & Organisation of Eastern Caribbean States (OECS). Author/ Public Speaker / Podcaster",
    text: "Tanitoluwa was hired as a software engineer at Runit Technologies to develop an app for the African Caribbean Sustainability & Investment Summit (ACSIS),21-23 November 2024." +
"Him and his team built the app from scratch meeting with my team periodically to assess and update on progress. "+
"Tanitoluwa took particular care of ensuring every required feature was incorporated into the app thereby delivering a first class product on time and on budget ready for market.",
    image: "https://i.pravatar.cc/150?img=1"
  },
  // { 
  //   name: "Jane Smith", 
  //   role: "Marketing Director, Innovate Inc.",
  //   text: "I love the experience, everything was perfect! The attention to detail and customer service is unmatched in the industry.",
  //   image: "https://i.pravatar.cc/150?img=5"
  // },
  // { 
  //   name: "Michael Johnson", 
  //   role: "Product Manager, NextGen Solutions",
  //   text: "A game-changer in the industry. The platform's intuitive design and powerful features have transformed our workflow completely. 5 stars!",
  //   image: "https://i.pravatar.cc/150?img=8"
  // },
  // {
  //   name: "Sarah Williams",
  //   role: "CTO, FutureTech",
  //   text: "Working with this team has been an absolute pleasure. Their technical expertise and problem-solving abilities are outstanding.",
  //   image: "https://i.pravatar.cc/150?img=10"
  // },
];

// Create motion components
const MotionBox = motion(Box);

const Slides = () => {
  const [index, setIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Colors that adapt to light/dark mode
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const quoteColor = useColorModeValue("blue.100", "blue.900");
  
  // Auto-advance slides
  useEffect(() => {
    let interval;
    if (isAutoplay) {
      interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay]);

  // Handle manual navigation
  const goToSlide = useCallback((i) => {
    setIndex(i);
    setIsAutoplay(false);
    // Resume autoplay after 10 seconds of inactivity
    const timeout = setTimeout(() => setIsAutoplay(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  const goToNext = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoplay(false);
    const timeout = setTimeout(() => setIsAutoplay(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  const goToPrev = useCallback(() => {
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setIsAutoplay(false);
    const timeout = setTimeout(() => setIsAutoplay(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box width="90%" maxW="800px" mx="auto" py={10} position="relative">
      <Box 
        position="relative"
        h={{base: "500px", md: "350px"}}
        overflow="hidden"
      >
        {/* Quote icon decoration */}
        <Icon
          viewBox="0 0 24 24"
          boxSize={{base: 16, md: 24}}
          color={quoteColor}
          position="absolute"
          top={-6}
          left={-6}
          opacity={0.4}
          zIndex={1}
        >
          <path
            fill="currentColor"
            d="M10 7L8 11H11V17H5V11L7 7H10M18 7L16 11H19V17H13V11L15 7H18Z"
          />
        </Icon>

        <AnimatePresence mode="wait">
          <MotionBox
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            position="absolute"
            width="100%"
            bg={cardBg}
            p={8}
            borderRadius="lg"
            boxShadow="xl"
            display="flex"
            flexDirection={{base: "column", md: "row"}}
            alignItems="center"
            gap={6}
          >
            {/* Testimonial image */}
            {/* <Box 
              borderRadius="full" 
              overflow="hidden" 
              boxSize={{base: "80px", md: "100px"}}
              border="3px solid"
              borderColor={accentColor}
              flexShrink={0}
              mb={{base: 4, md: 0}}
            >
              <Box
                as="img"
                src={testimonials[index].image}
                fallbackSrc="https://via.placeholder.com/100"
                alt={testimonials[index].name}
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </Box> */}
            
            {/* Testimonial content */}
            <Box textAlign={{base: "center", md: "left"}}>
              <Text 
                fontSize={{base: "md", md: "md", lg: "md"}} 
                fontStyle="italic" 
                color={textColor}
                mb={4}
              >
                "{testimonials[index].text}"
              </Text>
              <Text 
                fontWeight="bold" 
                fontSize={{base: "md", md: "lg"}} 
                color={accentColor}
              >
                {testimonials[index].name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {testimonials[index].role}
              </Text>
            </Box>
          </MotionBox>
        </AnimatePresence>
      </Box>

      {/* Navigation controls */}
      <Flex justify="space-between" mt={6} align="center">
        {/* Previous/Next buttons */}
        <Box 
          as="button"
          aria-label="Previous testimonial"
          onClick={goToPrev}
          borderRadius="full"
          bg={cardBg}
          p={2}
          boxShadow="md"
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
          transition="all 0.2s"
        >
          <Icon viewBox="0 0 24 24" boxSize={5} color={accentColor}>
            <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </Icon>
        </Box>
        
        {/* Indicator dots */}
        <Flex justify="center" gap={2}>
          {testimonials.map((_, i) => (
            <Box
              key={i}
              onClick={() => goToSlide(i)}
              borderRadius="full"
              w={index === i ? "10px" : "8px"}
              h={index === i ? "10px" : "8px"}
              bg={index === i ? accentColor : "gray.300"}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ bg: index === i ? accentColor : "gray.400" }}
              transform={index === i ? "scale(1.2)" : "scale(1)"}
            />
          ))}
        </Flex>
        
        <Box 
          as="button"
          aria-label="Next testimonial"
          onClick={goToNext}
          borderRadius="full"
          bg={cardBg}
          p={2}
          boxShadow="md"
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
          transition="all 0.2s"
        >
          <Icon viewBox="0 0 24 24" boxSize={5} color={accentColor}>
            <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </Icon>
        </Box>
      </Flex>
    </Box>
  );
};

export default Slides;