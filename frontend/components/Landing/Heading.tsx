import React from 'react';
import { motion } from 'framer-motion';

const AnimatedHeading = () => {
  const text = "MemeOrNot";

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: -20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      rotate: -10
    },
    visible: { 
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
    hover: {
      y: -5,
      color: "#60A5FA", // Tailwind blue-400
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className="absolute top-4 left-4 z-50 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-2xl font-bold flex space-x-[2px]"
      >
        {text.split('').map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            whileHover="hover"
            className="inline-block cursor-pointer"
            style={{
              textShadow: '0 0 8px rgba(96, 165, 250, 0.3)' // Subtle blue glow
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

export default AnimatedHeading;