import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cloud, Layout, Database, Wrench, Code, Music } from 'lucide-react';
import SkillBadge from '../ui/SkillBadge';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import Loading from '../ui/Loading';

const iconMap = {
  server: Server,
  cloud: Cloud,
  layout: Layout,
  database: Database,
  wrench: Wrench,
  code: Code,
  music: Music,
};

const Skills = () => {
  const { data: skillsData, loading, error } = usePortfolioData('skills');

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gray-50 flex items-center justify-center">
        <Loading />
      </section>
    );
  }

  if (error || !skillsData) {
    return (
      <section id="skills" className="py-20 bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">Error loading skills</p>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-gray-50">
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
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {skillsData.categories.map((category, categoryIndex) => {
            const Icon = iconMap[category.icon] || Server;
            
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-md p-8"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg">
                    <Icon className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.name}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBadge
                      key={skillIndex}
                      skill={skill}
                      index={skillIndex}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap gap-6 justify-center items-center text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary-100 border-2 border-primary-300"></div>
            <span className="text-gray-600">Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-300"></div>
            <span className="text-gray-600">Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-100 border-2 border-green-300"></div>
            <span className="text-gray-600">Intermediate</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
