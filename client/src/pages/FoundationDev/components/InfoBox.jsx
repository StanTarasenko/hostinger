// Modules
import { useParams } from 'react-router-dom';

const InfoBox = () => {
  const params = useParams();

  return <div style={{paddingTop: '50px'}}>{params.id}</div>
};

export default InfoBox;
