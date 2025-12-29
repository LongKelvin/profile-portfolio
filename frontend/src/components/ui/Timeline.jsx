import React from 'react';
import { motion } from 'framer-motion';

const Timeline = ({ items }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-200"></div>

      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
          className={`relative mb-12 ${
            index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:text-left'
          } pl-8 md:pl-0`}
        >
          {/* Timeline dot */}
          <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg -translate-x-[7px] md:-translate-x-1/2"></div>

          {/* Content */}
          <div className={`${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
            {item}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
