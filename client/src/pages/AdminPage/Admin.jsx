// Modules
import { useEffect, useState } from 'react';
import axios from 'axios';

// Helpers
import parseJwt from '../../helpers/jwtDecoder';

// Styles
import './styles.scss';

const Admin = () => {
  const currentToken = localStorage.getItem('accesstoken');
  const [isAdmin, setIsAdmin] = useState(false);
  const [devices, setDevices] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [currentDeviceId, setCurrentDeviceId] = useState("");

  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    axios
      .get("https://samsansoft.com/api/devices")
      .then((response) => {
        setDevices(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); 

  useEffect(() => {
    let jwt = parseJwt(currentToken);
    if (jwt && jwt.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentToken]);
  
  const createCard = async (e) => {
    const uniqueId = new Date().valueOf();;
    const token = localStorage.getItem('accesstoken');
    if (!token) {
      return alert('No token');
    }
    if (!isAdmin) {
      return alert('No access');
    }
    e.preventDefault();
    await axios
      .post("https://samsansoft.com/api/devices/insert", {
        id: uniqueId,
        name: name,
        description: description,
        img: image,
      }, {
        headers: {
          'Authorization': `${token}`
        }
      })
      .then((result) => {
        devices.unshift({ id: uniqueId, name: name, description: description, img: image });
        setDevices(devices);
      });
      setName('');
      setDescription('');
      setImage('');
  };

  const deleteDevice = (id) => {
    axios.delete(`https://samsansoft.com/api/devices/delete/${id}`).then((result) => {
      const newDevicesList = devices.filter((item) => item.id !== id);
      setDevices(newDevicesList);
    });
  };

  const updateDevice = async (id) => {
    const updatedDevices = devices.map((item) => {
      if (item.id === id) {
        return {...item, description: newDescription}
      } else {
        return item;
      }
    })
    setDevices(updatedDevices);
    await axios
      .put(`http://localhost:5000/api/devices/update/${id}`, {
        description: newDescription,
      })
      .then((result) => {
        console.log(result);
      });

    setNewDescription("");
  };

  return (
  <>
    <div style={{
        display: 'grid', 
        gridTemplateColumns: '40% 60%', 
        height: '100vh'}}
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            padding: '70px 20px 0 20px',
            backgroundColor: 'lightgrey',
            alignItems: 'center' 
          }}>
          <label htmlFor="name">Device Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              style={{ margin: '15px 0', width: '300px', padding: '5px' }}
              placeholder='Type name'
            />
            <label htmlFor="description">Device Description</label>
            <input
              type="text"
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              style={{ margin: '15px 0', width: '300px', padding: '5px' }}
              placeholder='Type description'
            />
            <label htmlFor="description">Device Image</label>
            <input
              type="text"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              style={{ margin: '15px 0', width: '300px', padding: '5px' }}
              placeholder='Add image URL'
            />
            <button 
              onClick={createCard} 
              className='updateBtn' 
              style={{marginLeft: '0'}}
            >
              Create device
            </button>
          </div>

          <div style={{
            paddingTop: '50px', 
            display: 'grid', 
            gridTemplateColumns: 'auto auto auto',
            background: 'black',
            overflow:'scroll',
            overflowX:'hidden'
          }}>
          {devices &&
              devices.map((device) => {
                return (
                  <div className="deviceCard" key={device.id}>
                    {device.img && 
                    <div style={{position: 'absolute', top: '10px', right: '10px'}}>
                      <img 
                        src={device.img} 
                        alt="img" 
                        width="50" 
                        height="50"
                      ></img>
                    </div>
                    }
                    <span style={{ fontWeight: 'bold' }}>{device.name}</span>
                    <span>{device.description}</span>
                    <div className='descriptionContainer'>
                    <span style={{ color: 'grey', marginBottom: '10px' }}>Change description</span>
                    <input
                      type="text"
                      id="updateInput"
                      onChange={(e) => setNewDescription(e.target.value)}
                      value={currentDeviceId === device.id ? newDescription : ""}
                      onClick={() => setCurrentDeviceId(device.id)}
                    />
                    <button
                      onClick={() => {
                        updateDevice(device.id);
                      }}
                      className='updateBtn'
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        deleteDevice(device.id);
                      }}
                      className='deleteBtn'
                    >
                      Delete
                    </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
  </>
  )
};

export default Admin;
