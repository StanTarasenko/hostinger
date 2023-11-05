// Styles
import './startstyles.scss';

const StartButton = ({ isOffline, setIsOffline }) => {
  return (
    <div className={isOffline ? "conic" : "conic hide"} onClick={() => setIsOffline(false)}>
      Start
    </div>
  )
};

export default StartButton;
