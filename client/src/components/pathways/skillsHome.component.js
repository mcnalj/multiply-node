import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import topicsPathwayArray from '../infrastructure/topicsPathwayArray';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PathwayLayout, { PathwayConnector } from './shared/pathwayLayout';
import PathwayCircle from './shared/pathwayCircle';
import { getUnitColor } from './shared/pathwayColors';

const SkillsHome = () => {
  // Get the unit and topic parameters from the URL
  const { unit, topic } = useParams();
  const navigate = useNavigate();
  
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

  const handleBackClick = () => {
    navigate(`/topicsHome/${unit}`);
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
    <div style={{ position: 'relative' }}>
      {/* Back Button - Top Left (scrolls with page) */}
      <Button
        onClick={handleBackClick}
        style={{
          position: 'absolute',
          top: '30px',
          left: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFD700',
          border: 'none',
          boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
          fontSize: '20px',
          color: '#333',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 16px rgba(255, 215, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.3)';
        }}
        title="Back to Topics"
      >
        ←
      </Button>

      {/* Pathway Content */}
      <PathwayLayout title={`${topicDisplayName} Skills`}>
        {sortedSkills.map((skillData, index) => (
          <React.Fragment key={skillData.skill}>
            <PathwayCircle
              title={skillData.skillDisplayName}
              onClick={() => handleSkillClick(skillData)}
              isActive={skillData.isLive}
              showAnimation={false}
              level={skillData.level}
              circleColor={getUnitColor(unit)}
            />
            {/* Connecting line to next circle (except for last one) */}
            {index < sortedSkills.length - 1 && <PathwayConnector />}
          </React.Fragment>
        ))}
      </PathwayLayout>
    </div>
  );
};

export default SkillsHome;