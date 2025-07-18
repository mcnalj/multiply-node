import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import topicsPathwayArray from '../infrastructure/topicsPathwayArray';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PathwayLayout, { PathwayConnector } from './shared/pathwayLayout';
import PathwayCircle from './shared/pathwayCircle';
import { getUnitColor } from './shared/pathwayColors';

const TopicsHome = () => {
  // Get the unit parameter from the URL
  const { unit } = useParams();
  const navigate = useNavigate();
  
  // Filter for the specified unit and get unique topics
  const unitData = topicsPathwayArray.filter(item => item.unit === unit);
  const uniqueTopics = [...new Set(unitData.map(item => item.topic))];
   
  // Convert topics to title case (fallback for topics without topicDisplayName)
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  // Get unit display name from the data
  const unitDisplayName = unitData.length > 0 ? unitData[0].unitDisplayName : toTitleCase(unit || '');

  // Get topic display names from the data
  const getTopicDisplayName = (topic) => {
    const topicItem = unitData.find(item => item.topic === topic);
    return topicItem?.topicDisplayName || toTitleCase(topic);
  };

  // Get skill count for a topic
  const getSkillCount = (topic) => {
    const topicSkills = unitData.filter(item => item.topic === topic);
    return topicSkills.length;
  };

  const handleTopicClick = (topic) => {
    console.log(`Clicked on topic: ${topic} in unit: ${unit}`);
    // Navigate to dynamic SkillsHome with unit and topic parameters
    navigate(`/skillsHome/${unit}/${topic}`);
  };

  const handleBackClick = () => {
    navigate('/sectionHome?shrunk=true');
  };

  // If no unit is provided or no topics found
  if (!unit || uniqueTopics.length === 0) {
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
          {!unit ? 'No unit specified' : `No topics found for ${unitDisplayName}`}
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
        title="Back to Units"
      >
        ←
      </Button>

      {/* Pathway Content */}
      <PathwayLayout title={`${unitDisplayName} Topics`}>
        {uniqueTopics.map((topic, index) => (
          <React.Fragment key={topic}>
            <PathwayCircle
              title={getTopicDisplayName(topic)}
              onClick={() => handleTopicClick(topic)}
              isActive={true}
              showAnimation={false}
              level={getSkillCount(topic)}
              skillCount={true}
              circleColor={getUnitColor(unit)}
            />
            {/* Connecting line to next circle (except for last one) */}
            {index < uniqueTopics.length - 1 && <PathwayConnector />}
          </React.Fragment>
        ))}
      </PathwayLayout>
    </div>
  );
};

export default TopicsHome;