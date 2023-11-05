// Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Store
import { useAppSelector } from '../../store/hooks.ts';

// Styles
import './dialogstyles.scss';

const DialogBox = ({ isOffline, step }) => {
  let lang = useAppSelector((state) => state.language.value);

  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDialog, setCurrentDialog] = useState(null);

  useEffect(() => {
    if (!currentDialog) return;
    const currentLang = lang === '' ? localStorage.getItem('lang') : lang;
    const textForDialog = currentLang === 'EN' ? currentDialog.text : currentDialog.textUkr;
    if (currentIndex < textForDialog.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + textForDialog[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, currentDialog.delay / 5);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentDialog, lang]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentText('');
    }, 500);
    return () => clearTimeout(timer);
  }, []); 

  useEffect(() => {
    if (!currentDialog) {
      setCurrentText('');
      setCurrentIndex(0);
    }
  }, [currentDialog]);

  async function fetchData(step) {
    await axios
      .get(`https://samsansoft.com/api/botdialogs/${step}`)
      .then((response) => {
        setCurrentDialog(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!step) return;
    setCurrentDialog(null);
    fetchData(step);
  }, [step]); 

  return <div className='dialogContainer'>{isOffline ? '...' : currentText}</div>
};

export default DialogBox;
