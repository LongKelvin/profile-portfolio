import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import Timeline from '../ui/Timeline';
import experienceData from '../../data/experience.json';

const Experience = () => {
  const experienceItems = experienceData.map((exp, index) => (
    <Card key={index} hover={false} className="max-w-2xl mx-auto">
      {/* Company & Role */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
          <Briefcase className="text-primary-600" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {exp.role}
          </h3>
          <p className="text-lg text-primary-600 font-medium mb-2">
            {exp.company}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {exp.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              {exp.location}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4">
        {exp.description}
      </p>

      {/* Achievements */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
        <ul className="space-y-2">
          {exp.achievements.map((achievement, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span className="text-primary-600 mt-1">•</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {exp.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Card>
  ));

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My professional journey in software development
          </p>
        </motion.div>

        {/* Timeline */}
        <Timeline items={experienceItems} />
      </div>
    </section>
  );
};

export default Experience;
