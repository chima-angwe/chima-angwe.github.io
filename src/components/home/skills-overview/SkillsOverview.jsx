import React, { useMemo, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as vscIcons from "react-icons/vsc";
import * as diIcons from "react-icons/di";

import { skills } from '../../../data/skills';

import './SkillsOverview.css';

const SkillsOverview = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate skills array for seamless infinite loop
  const duplicatedSkills = useMemo(() => {
    return [...skills, ...skills, ...skills, ...skills];
  }, [skills]);

  // Reverse array for second row
  const reversedSkills = useMemo(() => {
    const reversed = [...skills].reverse();
    return [...reversed, ...reversed, ...reversed, ...reversed];
  }, [skills]);

  const renderSkillItems = (skillsList, isGrayscale = false) => {
    return skillsList.map((skill, index) => {
      const Icon = FaIcons[skill.icon] || SiIcons[skill.icon] || vscIcons[skill.icon] || diIcons[skill.icon];

      return (
        <div
          key={`skill-${index}`}
          className={`skill-item ${isGrayscale ? 'grayscale-item' : ''}`}
        >
          {Icon && (
            <Icon
              className="skill-icon"
              size={isGrayscale ? 32 : 40}
              style={{ color: isHovered ? '#808080' : skill.color }}
            />
          )}
          <span className="skill-name">{skill.name}</span>
        </div>
      );
    });
  };

  return (
    <section className="skills-overview section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="skills-overview-header">
          <h2 className="skills-overview-title">Skills & Technologies</h2>
          <p className="skills-overview-subtitle">
            Tools and technologies I use to bring ideas to life
          </p>
        </div>

        {/* Skills Carousel Container */}
        <div
          className={`skills-carousel-wrapper ${isHovered ? 'is-hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Row 1 - Color, scrolls left */}
          <div className="skills-carousel skills-carousel-row-1">
            <div className="skills-carousel-track">
              {renderSkillItems(duplicatedSkills, false)}
            </div>
          </div>

          {/* Row 2 - Color by default, reversed array, scrolls left */}
          <div className="skills-carousel skills-carousel-row-2">
            <div className="skills-carousel-track">
              {renderSkillItems(reversedSkills, true)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsOverview;