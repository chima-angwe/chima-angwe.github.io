import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Hero from '../../components/home/hero/Hero';
import PageSkeleton from '../../components/common/skeleton/Skeleton';
import './Home.css';

const FeaturedProjects = lazy(() => import('../../components/home/featured-projects/FeaturedProjects'));
const AboutSections = lazy(() => import('../about/About'));
const RecentArticles = lazy(() => import('../../components/home/Recent-articles/RecentArticles'));
const CallToAction = lazy(() => import('../../components/home/call-to-action/CallToAction'));

const SectionLoader = () => <PageSkeleton variant="section" />;

const Home = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="home-page"
  >
    <Hero />
    <Suspense fallback={<SectionLoader />}><FeaturedProjects /></Suspense>
    <Suspense fallback={<SectionLoader />}><AboutSections /></Suspense>
    <Suspense fallback={<SectionLoader />}><RecentArticles /></Suspense>
    <Suspense fallback={<SectionLoader />}><CallToAction /></Suspense>
  </motion.div>
);

export default Home;
