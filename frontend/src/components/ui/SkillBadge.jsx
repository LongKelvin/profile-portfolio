import React from 'react';
import { motion } from 'framer-motion';

const SkillBadge = ({ skill, index = 0 }) => {
  const levelColors = {
    expert: 'bg-primary-100 text-primary-700 border-primary-300',
    advanced: 'bg-blue-100 text-blue-700 border-blue-300',
    intermediate: 'bg-green-100 text-green-700 border-green-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-transform hover:scale-105 ${
        levelColors[skill.level] || 'bg-gray-100 text-gray-700 border-gray-300'
      }`}
    >
      {skill.name}
    </motion.div>
  );
};

export default SkillBadge;
