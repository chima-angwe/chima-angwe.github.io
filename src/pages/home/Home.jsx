import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../../components/home/hero/Hero';
import FeaturedProjects from '../../components/home/featured-projects/FeaturedProjects';
import SkillsOverview from '../../components/home/skills-overview/SkillsOverview';
import CallToAction from '../../components/home/call-to-action/CallToAction';
import './Home.css';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-page"
    >
      <Hero />
      <FeaturedProjects />
      <SkillsOverview />
      <CallToAction />
    </motion.div>
  );
};

export default Home;