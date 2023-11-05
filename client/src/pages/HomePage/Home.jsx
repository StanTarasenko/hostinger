// Modules
import { useEffect, useState } from 'react';

// Components
import DialogBox from '../../components/DialogBox/DialogBox';
import DevLogos from '../../components/DevLogos/DevLogos';
import StartButton from '../../components/StartButton/StartButton';
import STBot from '../../components/STBot/STBot';

// Styles
import './styles.scss';

const Home = () => {
  const [isTalk, setIsTalk] = useState(false);
  const [isOffline, setIsOffline] = useState(true);
  const [delay, setDelay] = useState(0);
  const [step, setStep] = useState(null);
  const [isShowDev, setIsShowDev] = useState(false);

  const progress = localStorage.getItem('progress');

  useEffect(() => {
    setIsTalk(true);
    setDelay(3500);
  }, []);

  useEffect(() => {
    if (progress) { 
      setIsOffline(false);
      setIsShowDev(true);
      return setStep(3);
    };

    if (!isOffline) {
      setStep(1);
      setTimeout(() => {
        setStep(2);
        setIsTalk(true);
        setDelay(6500);
        setIsShowDev(true);
        setTimeout(() => {
          localStorage.setItem('progress', 1)
        }, 1000)
      }, 3000);
    }
  }, [isOffline, progress]);

  return (
  <div className='homeContainer'>
    {!progress && <div className='startBtn'>
      <StartButton setIsOffline={setIsOffline} isOffline={isOffline} />
    </div>}
    <div className='botBox'>
      <DialogBox step={step} isOffline={isOffline} />
      <STBot isTalk={isTalk} delay={delay} isOffline={isOffline} setIsTalk={setIsTalk} />
    </div>
      {!isOffline && 
        <div className='devBox'>
          <DevLogos isShowDev={isShowDev} />
        </div>
      }
  </div>
  )
};

export default Home;
