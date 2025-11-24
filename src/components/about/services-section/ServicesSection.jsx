import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaMobile, FaServer, FaPalette, FaRocket, FaTools } from 'react-icons/fa';
import { containerVariants, fadeInUp } from '../../../utils/animations';
import Card from '../../common/card/Card';
import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      icon: FaCode,
      title: 'Web Development',
      description:
        'Building responsive and performant web applications using modern frameworks like React and Vue.js.',
    },
    {
      icon: FaMobile,
      title: 'Mobile Development',
      description:
        'Creating cross-platform mobile applications with React Native for iOS and Android.',
    },
    {
      icon: FaServer,
      title: 'Backend Development',
      description:
        'Developing robust RESTful APIs and server-side applications with Node.js and Express.',
    },
    {
      icon: FaPalette,
      title: 'UI/UX Design',
      description:
        'Designing intuitive and beautiful user interfaces with a focus on user experience.',
    },
    {
      icon: FaRocket,
      title: 'Deployment & Hosting',
      description:
        'Setting up CI/CD pipelines and deploying applications to cloud platforms like AWS and Vercel.',
    },
    {
      icon: FaTools,
      title: 'Consultation',
      description:
        'Providing technical consultation and architecture planning for your projects.',
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
          Services I offer to help bring your ideas to life
        </p>
      </motion.div>

      <motion.div
        className="services-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div key={index} variants={fadeInUp}>
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