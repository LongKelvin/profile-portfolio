import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  hover = true,
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' } : {}}
      className={`bg-white rounded-xl shadow-md p-6 transition-shadow duration-200 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
