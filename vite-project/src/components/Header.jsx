import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    initial: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      y: -100,
      opacity: 0
    },
    animate: {
      background: isScrolled 
        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const titleVariants = {
    initial: { 
      scale: 0.8,
      opacity: 0,
      rotateX: -90
    },
    animate: { 
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        type: 'spring',
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      textShadow: '0 0 20px rgba(255,255,255,0.8)',
      transition: { duration: 0.3 }
    }
  };

  const subtitleVariants = {
    initial: { 
      y: 30,
      opacity: 0
    },
    animate: { 
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        '0 0 20px rgba(102, 126, 234, 0.3)',
        '0 0 40px rgba(118, 75, 162, 0.5)',
        '0 0 20px rgba(102, 126, 234, 0.3)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const particleVariants = {
    animate: {
      y: [-20, 20],
      x: [-10, 10],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.header
      className={`relative overflow-hidden text-white shadow-2xl transition-all duration-300 ${
        isScrolled ? 'py-3 px-6 backdrop-blur-md' : 'py-6 px-8'
      }`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            variants={particleVariants}
            animate="animate"
            transition={{
              delay: i * 0.5,
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Glowing Border Effect */}
      <motion.div
        className="absolute inset-0 border-2 border-white opacity-20 rounded-lg"
        variants={glowVariants}
        animate="animate"
      />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <motion.h1
          className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 ${
            isScrolled ? 'text-2xl' : 'text-4xl md:text-5xl'
          }`}
          variants={titleVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontWeight: 800,
            letterSpacing: '-0.025em'
          }}
        >
          MyApplication
          <motion.span
            className="text-yellow-300 ml-2"
            animate={{
              textShadow: [
                '0 0 10px rgba(255, 193, 7, 0.5)',
                '0 0 20px rgba(255, 193, 7, 0.8)',
                '0 0 10px rgba(255, 193, 7, 0.5)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            CowShade
          </motion.span>
        </motion.h1>

        <motion.p
          className={`text-purple-100 font-medium ${
            isScrolled ? 'text-sm mt-1' : 'text-lg mt-2'
          }`}
          variants={subtitleVariants}
          initial="initial"
          animate="animate"
        >
          Innovative Solutions for Modern Challenges
        </motion.p>

        {/* Animated Underline */}
        <motion.div
          className="mx-auto mt-4 bg-gradient-to-r from-transparent via-white to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: isScrolled ? '60px' : '120px', 
            opacity: 1 
          }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ height: '2px' }}
        />
      </div>

      {/* Floating Action Elements */}
      <div className="absolute top-4 right-4 flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-white rounded-full opacity-40"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Bottom Wave Effect */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
      />
    </motion.header>
  );
};

export default Header;