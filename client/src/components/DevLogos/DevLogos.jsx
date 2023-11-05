// Modules
import { Link } from 'react-router-dom';

// Styles
import './devstyles.scss';

const DevLogos = ({ isShowDev }) => {
  return (
    <>
      <Link to='/foundation' className={!isShowDev ? 'devPart' : 'devPart show'}>
        <div className={!isShowDev ? 'devImg' : 'devImg show'}>
          <img 
            src='https://seeklogo.com/images/J/javascript-logo-8892AEFCAC-seeklogo.com.png' 
            alt="img" 
            width="50" 
            height="50"
          ></img>
        </div>
        <div className={!isShowDev ? 'devPartTitle': 'devPartTitle show'}>FOUNDATION</div>
        <div className='rowBox'>
          <div className={!isShowDev ? 'devImg' : 'devImg show'}>
            <img 
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/1024px-HTML5_Badge.svg.png' 
              alt="img" 
              width="50" 
              height="50"
            ></img>
          </div>
          <div className={!isShowDev ? 'devImg' : 'devImg show'}>
            <img 
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/800px-CSS3_logo.svg.png' 
              alt="img" 
              width="50" 
              height="50"
            ></img>
          </div>
        </div>
      </Link>
      <Link to='/front' className={!isShowDev ? 'devPart' : 'devPart show'}>
      <div className={!isShowDev ? 'devImg' : 'devImg show'}>
          <img 
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png' 
            alt="img" 
            width="50" 
            height="50"
          ></img>
        </div>
        <div className={!isShowDev ? 'devPartTitle': 'devPartTitle show'}>FRONT</div>
        <div className='rowBox'>
          <div className={!isShowDev ? 'devImg' : 'devImg show'}>
            <img 
              src='https://cdn.worldvectorlogo.com/logos/redux.svg' 
              alt="img" 
              width="50" 
              height="50"
            ></img>
          </div>
          <div className={!isShowDev ? 'devImg' : 'devImg show'}>
            <img 
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/2560px-Sass_Logo_Color.svg.png' 
              alt="img" 
              width="50" 
              height="50"
            ></img>
          </div>
        </div>
      </Link>
      <Link to='/back' className={!isShowDev ? 'devPart' : 'devPart show'}>
      <div className={!isShowDev ? 'devImg' : 'devImg show'}>
          <img 
            src='https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png' 
            alt="img" 
            width="50" 
            height="50"
          ></img>
        </div>
        <div className={!isShowDev ? 'devPartTitle': 'devPartTitle show'}>BACK</div>
        <div className='rowBox'>
          <div className={!isShowDev ? 'devImg' : 'devImg show'}>
            <img 
              src='https://db.cs.uni-tuebingen.de/teaching/ws2223/sql-is-a-programming-language/logo.svg' 
              alt="img" 
              width="50" 
              height="50"
            ></img>
          </div>
          <div className={!isShowDev ? 'devImg': 'devImg show'}>
            <img 
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Status_iucn_EX_icon_blank.svg/2048px-Status_iucn_EX_icon_blank.svg.png' 
              alt="img" 
              width="50" 
              height="50"
            ></img>
          </div>
        </div>
      </Link>
    </>
  )
};

export default DevLogos;
