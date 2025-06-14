import React from 'react';

export default function FloatingRSVPButton() {
  const handleClick = () => {
    const section = document.getElementById('rsvpSection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new Event('openRSVPForm'));
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 9999,
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      backgroundColor: '#6B8E7E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      border: 'none'
    }} 
    onClick={handleClick}
    >
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="20" r="8" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="25" cy="20" r="8" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}