import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AnimatedHeading = () => {
  const text = "FunnyOrFud";

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
      color: "#93C5FD", // Lighter blue for better contrast on dark
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      x: 20
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#f8fafc", // Slightly darker white on hover
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-2xl font-bold flex space-x-[2px] text-gray-100" // Slightly off-white for better visibility
        >
          {text.split('').map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              whileHover="hover"
              className="inline-block cursor-pointer"
              style={{
                textShadow: '0 0 8px rgba(147, 197, 253, 0.3)' // Adjusted glow for dark background
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <Link href="/app/memes/" className="inline-block">
          <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium shadow-lg transition-all hover:shadow-white/25">
            Explore
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default AnimatedHeading;