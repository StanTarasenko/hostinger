// Modules
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Components
import LogToggle from '../../components/LogToggle';

// Styles
import './styles.scss';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [usersList, setUsersList] = useState([]);
  const [alignment, setAlignment] = useState('registration');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (alignment === 'registration') {
      const isExcist = usersList.filter((item) => item.email === data.email).length > 0;
      if (isExcist) {
        return alert('Email already in use!')
      }
      const uniqueId = uuidv4();
      return await axios
      .post("https://samsansoft.com/api/users/registration", {
        id: uniqueId,
        email: data.email,
        password: data.password,
        list: JSON.stringify(usersList)
      })
      .then((result) => {
        localStorage.setItem('accesstoken', result.data.token)
      });
    } else {
      const isExcist = usersList.filter((item) => item.email === data.email).length > 0;
      const currentUser = usersList.find((item) => item.email === data.email);
      if (!isExcist) {
        return alert('Email is not register');
      }
      return await axios
      .post("https://samsansoft.com/api/users/login", {
        email: data.email,
        password: data.password,
        user: currentUser,
      })
      .then((result) => {
        localStorage.setItem('accesstoken', result.data.token)
        navigate('/');
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    axios
      .get("https://samsansoft.com/api/users")
      .then((response) => {
        setUsersList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); 

  return (
    <div className="loginCard">
      <div className="loginTitle">
        <LogToggle alignment={alignment} setAlignment={setAlignment} />
      </div>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="loginSign">
            {alignment === 'registration' ? 'Registration' : 'Log in'}
          </div>
          <div className="loginLabel">Email</div>
          <div className="form-group">
            <input
              className="form-control"
              style={{borderRadius: '8px', border: '1px solid grey', padding: '5px'}}
              type="email"
              placeholder="email"
              name="email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="loginLabel">Password</div>
          <div className="form-group">
            <input
              className="form-control"
              style={{borderRadius: '8px', border: '1px solid grey', padding: '5px'}}
              type={alignment === 'registration' ? 'text' : 'password'}
              placeholder="password"
              name="password"
              {...register('password', { required: true })}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginTop: '10px' }}>
            <input 
              className={email && password.length > 3 ? "updateBtn" : "disabledBtn"} 
              type="submit" 
              value={alignment === 'registration' ? 'Create' : 'Enter'} 
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
