import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import topicsPathwayArray from '../infrastructure/topicsPathwayArray';
import { Container, Row, Col } from 'react-bootstrap';
import PathwayLayout, { PathwayConnector } from './shared/pathwayLayout';
import PathwayCircle from './shared/pathwayCircle';

const SkillsHome = () => {
  // Get the unit and topic parameters from the URL
  const { unit, topic } = useParams();
  
  // Filter for the specified unit and topic, and get skills
  const skillsData = topicsPathwayArray.filter(item => 
    item.unit === unit && item.topic === topic
  );
  
  // Sort by level to maintain order
  const sortedSkills = skillsData.sort((a, b) => a.level - b.level);

  // Convert to title case (fallback function)
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  // Get unit and topic display names from the data
  const unitDisplayName = sortedSkills.length > 0 ? sortedSkills[0].unitDisplayName : toTitleCase(unit || '');
  const topicDisplayName = sortedSkills.length > 0 ? sortedSkills[0].topicDisplayName : toTitleCase(topic || '');

  const handleSkillClick = (skill) => {
    console.log(`Clicked on skill: ${skill.skill} in topic: ${topic}, unit: ${unit}`);
    // TODO: Navigate to specific skill activity or handle skill selection
  };

  // If no unit/topic is provided or no skills found
  if (!unit || !topic || sortedSkills.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <h3 style={{ color: '#333' }}>
          {!unit || !topic 
            ? 'Unit and topic must be specified' 
            : `No skills found for ${topicDisplayName} in ${unitDisplayName}`
          }
        </h3>
      </div>
    );
  }

  return (
    <PathwayLayout title={`${topicDisplayName} Skills`}>
      {sortedSkills.map((skillData, index) => (
        <React.Fragment key={skillData.skill}>
          <PathwayCircle
            title={skillData.skillDisplayName}
            onClick={() => handleSkillClick(skillData)}
            isActive={skillData.isLive}
            showAnimation={false}
            level={skillData.level}
          />
          {/* Connecting line to next circle (except for last one) */}
          {index < sortedSkills.length - 1 && <PathwayConnector />}
        </React.Fragment>
      ))}
    </PathwayLayout>
  );
};

export default SkillsHome;