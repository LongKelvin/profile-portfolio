import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Tag } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import Loading from '../ui/Loading';

const Projects = () => {
  const { data: projectsData, loading, error } = usePortfolioData('projects');

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50 flex items-center justify-center">
        <Loading />
      </section>
    );
  }

  if (error || !projectsData) {
    return (
      <section id="projects" className="py-20 bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">Error loading projects</p>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
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
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my work in backend development, cloud deployment, and creative applications
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full flex flex-col">
                {/* Project Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <Tag size={48} className="text-primary-600" />
                </div>

                {/* Project Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 flex-1">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Github}
                    onClick={() => window.open(project.github, '_blank')}
                    className="flex-1"
                  >
                    Code
                  </Button>
                  {project.demo && (
                    <Button
                      variant="primary"
                      size="sm"
                      icon={ExternalLink}
                      onClick={() => window.open(project.demo, '_blank')}
                      className="flex-1"
                    >
                      Demo
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Want to see more? Check out my GitHub for additional projects and contributions.
          </p>
          <Button
            variant="outline"
            icon={Github}
            onClick={() => window.open('https://github.com/yourusername', '_blank')}
          >
            Visit My GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
