// Modules
import React, { useState } from 'react';

// MUI
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// Features
import { addLang } from '../../features/language/lang-slice.ts';
import { useAppDispatch } from '../../store/hooks.ts';

const LangToggle = () => {
  const dispatch = useAppDispatch();
  const [language, setLanguage] = useState('');

  const handleChange = (e) => {
    setLanguage(e.target.value);
    dispatch(addLang(e.target.value));
    localStorage.setItem('lang', e.target.value);
    window.location.reload();
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={language}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      style={{ marginRight: '20px' }}
    >
      <ToggleButton 
        value="EN" 
        style={{ 
          fontWeight: 'bold',   
          color: 'white',   
          padding: '0 10px',  
          border: '1px solid white' 
        }}
        >
          EN
        </ToggleButton>
      <ToggleButton 
        value="UK" 
        style={{ 
          fontWeight: 'bold',   
          color: 'white',   
          padding: '0 10px',  
          border: '1px solid white' 
        }}
        >
          UK
        </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default LangToggle;
