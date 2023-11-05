// Modules
import React from 'react';

// MUI
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const LogToggle = ({ alignment, setAlignment }) => {

  const handleChange = (e) => {
    setAlignment(e.target.value);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="registration" style={{ fontWeight: 'bold' }}>Sign In</ToggleButton>
      <ToggleButton value="login" style={{ fontWeight: 'bold' }}>Log In</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default LogToggle;
