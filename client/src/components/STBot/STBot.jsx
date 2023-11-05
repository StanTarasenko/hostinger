// Modules
import { useState, useEffect } from 'react';

// Components
import Loader from '../Loader/Loader';

// Styles
import './botstyles.scss';

const STBot = ({ isTalk, delay, isOffline, setIsTalk }) => {
  const [isClip, setIsClip] = useState(false);
  const [iterator, setIterator] = useState('');
  const [isTurnOn, setIsTurnOn] = useState(true);
  const [isLoader, setIsLoader] = useState(false);

  const touchHandler = () => {
    setIsClip(true);
  };

  useEffect(() => {
    if (!isOffline) {
      setIsLoader(true);
      setTimeout(() => {
        setIsLoader(false);
        setIsTurnOn(false);
      }, 200)
    }
  }, [isOffline]);

  useEffect(() => {
    if (isTalk) {
      setIterator('infinite');
      setTimeout(() => {
        setIterator('');
        setIsTalk(false);
      }, delay);
    }
  }, [isTalk, delay, setIsTalk]);

  useEffect(() => {
    if (isClip) {
      setTimeout(() => {
        setIsClip(false);
      }, 250)
    }
  }, [isClip]);
  
  return (
  <div className='botContainer'>
    <div className='bothead'>
      <div className='leftEayr'></div>
      <div className='face'>
        <div className='bothear'></div>
        <div className='botscreen'>
          {isLoader && <div className='offline'>
            <Loader />
          </div>}
          {isTurnOn
            ? !isLoader && <div className='offline'>OFFLINE</div>
            : <><div className='botyeas'>
                <div className={isClip ? 'leftyea clip' : 'leftyea'}></div>
                <div className='leftyea show'></div>
              </div>
              <div className='botSmile'>
                <div className='botmouth' style={{ animationIterationCount: `${iterator}` }}></div>
              </div>
              </>
            }
        </div>
      </div>
      <div className='rightEayr'></div>
    </div>
    <div className='botbody'>
      <div className='leftHand'></div>
      <div className='chest'>
        <div className='chestLabel' onClick={touchHandler}>ST-1</div>
      </div>
      <div className='rightHand'></div>
    </div>
    <div className='botFoots'>
      <div className='botFootsBottom'>
        <div className='topPart'></div>
        <div className='bottomPart'></div>
      </div>
    </div>
  </div>
  )
};

export default STBot;
