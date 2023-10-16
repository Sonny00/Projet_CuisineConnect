import React from 'react';

const LoadingScreen = () => {
  const loadingScreenStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  };

  const loaderStyles = {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
  };

  const textStyles = {
    color: '#fff',
  };

  return (
    <div style={loadingScreenStyles}>
      <div style={loaderStyles}></div>
      <p style={textStyles}>Chargement en cours...</p>
    </div>
  );
};

export default LoadingScreen;
