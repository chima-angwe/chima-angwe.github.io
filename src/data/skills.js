// Skills data
export const skills = [
  // Frontend
  {
    id: 1,
    name: 'React',
    category: 'Frontend',
    icon: 'FaReact',
    color: '#61DAFB', // Official brand color (optional)
  },
  {
    id: 2,
    name: 'JavaScript',
    category: 'Frontend',
    icon: 'SiJavascript',
    color: '#F7DF1E',
  },
  {
    id: 3,
    name: 'Tailwind CSS',
    category: 'Frontend',
    icon: 'SiTailwindcss',
    color: '#06B6D4',
  },
  {
    id: 4,
    name: 'HTML/CSS',
    category: 'Frontend',
    icon: 'FaHtml5',
    color: '#E34F26',
  },
  {
    id: 5,
    name: 'TypeScript',
    category: 'Frontend',
    icon: 'SiTypescript',
    color: '#3178C6',
  },

  // Backend
  {
    id: 6,
    name: 'Node.js',
    category: 'Backend',
    icon: 'FaNodeJs',
    color: '#339933',
  },
  {
    id: 7,
    name: 'Express.js',
    category: 'Backend',
    icon: 'SiExpress',
    color: '#000000',
  },
  {
    id: 8,
    name: 'REST APIs',
    category: 'Backend',
    icon: 'FaServer',
    color: '#0078D4',
  },

  // Database
  {
    id: 9,
    name: 'MongoDB',
    category: 'Database',
    icon: 'SiMongodb',
    color: '#47A248',
  },
  {
    id: 10,
    name: 'MySQL',
    category: 'Database',
    icon: 'SiMysql',
    color: '#4479A1',
  },
  {
    id: 11,
    name: 'PostgreSQL',
    category: 'Database',
    icon: 'SiPostgresql',
    color: '#4169E1',
  },

  // Tools & Others
  {
    id: 12,
    name: 'Git',
    category: 'Tools',
    icon: 'FaGitAlt',
    color: '#F05032',
  },
  {
    id: 13,
    name: 'GitHub',
    category: 'Tools',
    icon: 'FaGithub',
    color: '#181717',
  },
  {
    id: 14,
    name: 'VS Code',
    category: 'Tools',
    icon: 'SiVisualstudiocode',
    color: '#007ACC',
  },
  {
    id: 15,
    name: 'Postman',
    category: 'Tools',
    icon: 'SiPostman',
    color: '#FF6C37',
  },
  {
    id: 16,
    name: 'Figma',
    category: 'Tools',
    icon: 'FaFigma',
    color: '#F24E1E',
  },
  {
    id: 17,
    name: 'Docker',
    category: 'Tools',
    icon: 'FaDocker',
    color: '#2496ED',
  },
];

// Skill categories
export const skillCategories = ['Frontend', 'Backend', 'Database', 'Tools'];

// Helper function to get skills by category
export const getSkillsByCategory = (category) => {
  return skills.filter((skill) => skill.category === category);
};

// Helper function to get all categories with their skills
export const getSkillsGroupedByCategory = () => {
  return skillCategories.map((category) => ({
    category,
    skills: getSkillsByCategory(category),
  }));
};