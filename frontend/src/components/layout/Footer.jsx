import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../../hooks/usePortfolioData';

const Footer = () => {
  const { data: personalData } = usePortfolioData('personal');
  const currentYear = new Date().getFullYear();

  if (!personalData) {
    return null;
  }

  const socialLinks = [
    { 
      icon: Github, 
      href: personalData.contact.github, 
      label: 'GitHub',
      color: 'hover:text-gray-900'
    },
    { 
      icon: Linkedin, 
      href: personalData.contact.linkedin, 
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    },
    { 
      icon: Mail, 
      href: `mailto:${personalData.contact.email}`, 
      label: 'Email',
      color: 'hover:text-primary-600'
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                className={`text-gray-400 transition-colors ${social.color}`}
                aria-label={social.label}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gray-700"></div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-sm flex items-center gap-2 justify-center">
              © {currentYear} {personalData.name}. Built with{' '}
              <Heart size={16} className="text-red-500 fill-current animate-pulse" />{' '}
              using React & Tailwind CSS
            </p>
          </div>

          {/* Tech Stack Badge */}
          <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-500">
            <span className="px-3 py-1 bg-gray-800 rounded-full">React</span>
            <span className="px-3 py-1 bg-gray-800 rounded-full">Vite</span>
            <span className="px-3 py-1 bg-gray-800 rounded-full">Tailwind CSS</span>
            <span className="px-3 py-1 bg-gray-800 rounded-full">Azure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
