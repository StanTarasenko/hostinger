// Modules
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Components
import DialogBox from '../../components/DialogBox/DialogBox';
import STBot from '../../components/STBot/STBot';

// Styles
import './foundation.scss';

const FoundationDev = () => {
  const [isTalk, setIsTalk] = useState(false);
  const [delay, setDelay] = useState(0);
  const [step, setStep] = useState(null);
  const [chapters, setChapters] = useState([]);


  const chapterName = window.location.pathname.replace('/', '');
  const lang = localStorage.getItem('lang');

  useEffect(() => {
    if (chapterName === 'foundation') {
      setStep(4);
      setIsTalk(true);
      setDelay(8000);
    }
    if (chapterName === 'front') {
      setStep(5);
      setIsTalk(true);
      setDelay(6000);
    }
    if (chapterName === 'back') {
      setStep(6);
      setIsTalk(true);
      setDelay(6000);
    }
  }, [chapterName]);

  useEffect(() => {
    axios
      .get("https://samsansoft.com/api/foundationChapters")
      .then((response) => {
        const filteredData = response.data.filter((item) => item.chapter === chapterName);
        setChapters(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chapterName]); 

  return (
    <div className='foundationContainer'>
      <div className='foundationCards'>
        {chapters && chapters.map((chapter) => 
          <div className='foundationCard' key={chapter.id}>
            <div className='cardTitle'>
              <img 
                src={chapter.image} 
                alt="img" 
                width="50" 
                height="50"
              ></img>
              <span>{chapter.title}</span>
            </div>
            <div className='cardText'>
              {lang === 'EN' ? chapter.text : chapter.textUkr}
            </div>
            <div className='cardAnotation'>
              {lang === 'EN' ? chapter.anotation : chapter.anotationUkr}
            </div>
            <div className='proccedBtn'>
              <Link 
                to={`/${chapterName}/${chapter.id}`} 
                className='foundationLink'
              >
                Procced
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className='foundationBot'>
        <div className='foundationDialog'>
          <DialogBox step={step} isOffline={false} />
        </div>
        <div>
          <STBot isTalk={isTalk} delay={delay} isOffline={false} setIsTalk={setIsTalk} />
        </div>
    </div>
    </div>
  )
};

export default FoundationDev;
