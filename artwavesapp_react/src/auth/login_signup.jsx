// eslint-disable-next-line
import React, { useState } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from '../images/logo1.png';
import '../styles/login_singup.css';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; 

function registerUser(userData) {
  return axios.post(`${BASE_URL}/api/register/`, userData);
}

function loginUser(userData) {
  return axios.post(`${BASE_URL}/api/login/`, userData);
}

function displayMessage(message) {
  alert(message);
}

function LoginForm({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isEmailFocused && !isPasswordFocused) {
      if (email.trim() === '' || password.trim() === '') {
        alert('Por favor ingrese correo electrónico y contraseña');
        return;
      }
      loginUser({ email, password })
        .then(response => {
          if (response && response.data && response.data.message) {
            displayMessage(response.data.message);
            setIsLoggedIn(true);
          } else {
            console.error('Respuesta inesperada del servidor:', response);
          }
        })
        .catch(error => {
          if (error && error.response && error.response.data && error.response.data.error) {
            console.error(error.response.data.error);
          } else {
            console.error('Error inesperado:', error);
          }
        });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!isEmailFocused && !isPasswordFocused) {
        handleFormSubmit(e);
      }
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <div id="one">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Correo Electrónico</label>
        <p>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su mail"
            autoComplete="off"
            value={email}
            onChange={handleEmailChange}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            onKeyDown={handleKeyDown}
            onKeyPress={handleEnterPress}
            className={isEmailFocused ? "input-focus" : ""}
          />
        </p>

        <label htmlFor="password">Contraseña</label>
        <p>
          <input
type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={()=> setIsPasswordFocused(false)}
            onKeyDown={handleKeyDown}
            onKeyPress={handleEnterPress}
            className={isPasswordFocused ? "input-focus" : ""}
          />
        </p>

        <p className="submit"><input type="submit" value="Ingresar" /></p>
      </form>
    </div>
  );
}

function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFullNameFocused, setIsFullNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isFullNameFocused && !isEmailFocused && !isPasswordFocused) {
      if (fullName.trim() === '' || email.trim() === '' || password.trim() === '') {
        alert('Por favor ingrese nombre completo, correo electrónico y contraseña');
        return;
      }
      registerUser({ full_name: fullName, email, password }) // Cambiado de 'name' a 'full_name'
        .then(response => {
          if (response && response.data && response.data.message) {
            console.log(response.data.message);
          } else {
            console.error('Respuesta inesperada del servidor:', response);
          }
        })
        .catch(error => {
          if (error && error.response && error.response.data && error.response.data.error) {
            console.error(error.response.data.error);
          } else {
            console.error('Error inesperado:', error);
          }
        });
    }
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!isFullNameFocused && !isEmailFocused && !isPasswordFocused) {
        handleFormSubmit(e);
      }
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <div id="two">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="fName">Nombre Completo</label>
        <p>
          <input
            type="text"
            id="fName"
            autoComplete="off"
            value={fullName}
            onChange={handleFullNameChange}
            onFocus={() => setIsFullNameFocused(true)}
            onBlur={() => setIsFullNameFocused(false)}
            onKeyDown={handleKeyDown}
            onKeyPress={handleEnterPress}
            className={isFullNameFocused ? "input-focus" : ""}
          />
        </p>

        <label htmlFor="emailIn">Correo Electrónico</label>
        <p>
          <input
            type="email"
            id="emailIn"
            placeholder="Ingrese un mail válido"
            autoComplete="off"
            value={email}
            onChange={handleEmailChange}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            onKeyDown={handleKeyDown}
            onKeyPress={handleEnterPress}className={isEmailFocused ? "input-focus" : ""}
          />
        </p>

        <label htmlFor="passwordIn">Contraseña</label>
        <p>
          <input
            type="password"
            id="passwordIn"
            placeholder="8 Cáracteres mínimo"
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={()=> setIsPasswordFocused(false)}
            onKeyDown={handleKeyDown}
            onKeyPress={handleEnterPress}
            className={isPasswordFocused ? "input-focus" : ""}
          />
        </p>

        <p className="submit"><input type="submit" value="Crear Cuenta" /></p>
      </form>
    </div>
  );
}

function LoginSignupForm({ onLogin }) {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <section id="wrapper">
      <div className="bg"></div>
      <div className="login-signup-form">
        <img src={logo} alt="Logo" className="logo" />
        {isSignIn ? (
          <LoginForm onLogin={onLogin} />
        ) : (
          <SignupForm />
        )}
        <div id="button" onClick={toggleForm}>{isSignIn ? 'Registrarse' : 'Loguearse'}</div>
      </div>
    </section>
  );
}

export default LoginSignupForm;