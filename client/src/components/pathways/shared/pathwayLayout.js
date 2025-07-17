import React from 'react';

const PathwayLayout = ({ 
  title, 
  children, 
  showTitle = true,
  backgroundColor = '#f8f9fa' 
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      backgroundColor,
      padding: '20px'
    }}>
      {/* Title */}
      {showTitle && (
        <h3 className="fs-3 fs-md-2 fs-lg-1 text-center mb-5" style={{ 
          color: '#333', 
          fontWeight: 'normal' 
        }}>
          {title}
        </h3>
      )}
      
      {/* Vertical pathway container */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '40px'
      }}>
        {children}
      </div>
    </div>
  );
};

export const PathwayConnector = () => (
  <div style={{
    width: '4px',
    height: '30px',
    backgroundColor: '#ccc',
    marginTop: '10px'
  }} />
);

export default PathwayLayout;
