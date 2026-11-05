import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaLayerGroup } from 'react-icons/fa';
import { containerVariants, fadeInUp } from '../../../utils/animations';
import Card from '../../common/card/Card';
import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      icon: FaCode,
      title: 'Frontend Development',
      description: 'Responsive, accessible interfaces built with React and modern JavaScript.',
    },
    {
      icon: FaServer,
      title: 'Backend Development',
      description: 'REST APIs, server-side logic, and data integrations with Node.js, Express, and MongoDB.',
    },
    {
      icon: FaLayerGroup,
      title: 'Full-Stack Development',
      description: 'End-to-end web applications, from the user interface to APIs, databases, and deployment.',
    },
  ];

  return (
    <section className="services-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="services-section-title">What I Do</h2>
        <p className="services-section-subtitle">
          Frontend, backend, and full-stack engineering for useful web products.
        </p>
      </motion.div>

      <motion.div
        className="services-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div key={service.title} variants={fadeInUp}>
              <Card className="service-card">
                <div className="service-icon">
                  <Icon size={32} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ServicesSection;
