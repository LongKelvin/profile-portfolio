import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import Button from '../ui/Button';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import Loading from '../ui/Loading';
import avatarImage from '../../assets/avartar.jpg';

const Hero = () => {
  const { data: personalData, loading, error } = usePortfolioData('personal');

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center">
        <Loading />
      </section>
    );
  }

  if (error || !personalData) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error loading data. Please try again.</p>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          {/* Profile Image */}
          {personalData.avatar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <img
                  src={avatarImage}
                  alt={personalData.name}
                  className="w-full h-full rounded-full object-cover shadow-2xl ring-4 ring-primary-100"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 to-blue-500/20"></div>
              </div>
            </motion.div>
          )}

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-4"
          >
            {personalData.name}
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-2xl md:text-3xl text-gray-700 font-medium mb-2">
              {personalData.title}
            </h2>
            <p className="text-xl text-primary-600 font-medium">
              {personalData.subtitle}
            </p>
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
          >
            {personalData.summary}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <Button variant="primary" size="lg" onClick={scrollToContact}>
              Get In Touch
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToAbout}>
              Learn More
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-6 justify-center"
          >
            <motion.a
              href={personalData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={28} />
            </motion.a>
            <motion.a
              href={personalData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Linkedin size={28} />
            </motion.a>
            <motion.a
              href={`mailto:${personalData.contact.email}`}
              whileHover={{ scale: 1.2, y: -5 }}
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Mail size={28} />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <ChevronDown size={32} className="text-gray-400" />
      </motion.div>
    </section>
  );
};

export default Hero;
