import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabaseClient } from '../../../services/supaBase';
import { useAuth } from '../../../context/Auth/AuthContext';

const LoginView = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }
      if (data.session.access_token) {
        saveToken(data.session.access_token);
        console.log('Token saved from login');
      }
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="w-full h-lvh bg-dark-primary-theme flex items-center justify-center">
      <div className="w-700 h-auto bg-white flex flex-row">
        <div className="relative w-1/2 bg-[url('https://cdn.mos.cms.futurecdn.net/SUzstJWywL5jvqDKB2K2dk.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative w-1/2 p-6 flex flex-col items-end">
          <Link className="mb-10" to={'/'}>
            <FontAwesomeIcon
              icon={faTimes}
              size="2x"
              className="text-black font-light"
            />
          </Link>

          <div className="w-full px-5 flex flex-col">
            <h1 className="text-3xl font-bold mb-6">
              Login <span className="logo-text">CenturyArt</span>
            </h1>
            <form className="flex flex-col text-sm" onSubmit={handleSubmit}>
              <label htmlFor="title" className="text-sm font-bold">
                Enter your Email
              </label>
              <input
                type="email"
                className="w-auto p-2 border mt-1 mb-3 text-xs"
                name="email"
                onChange={handleChange}
              />
              <label htmlFor="title" className="text-sm font-bold">
                Enter your password
              </label>
              <input
                type="password"
                className="w-full p-2 border mt-1 mb-3 text-xs"
                name="password"
                onChange={handleChange}
              />
              <button
                className="w-full p-3 bg-dark-primary text-sm text-white"
                type="submit"
              >
                LOGIN
              </button>
            </form>

            <div className="flex flex-col items-start mt-4">
              <p className="text-xs font-normal flex items-center">
                To be part of community
                <button className="ml-2" onClick={() => navigate('/register')}>
                  <span className="text-sm font-bold text-dark-primary ">
                    Join CenturyArt
                  </span>
                </button>
              </p>

              <p className="text-xs font-normal text-gray-600 mt-6">
                By logging in to CenturyArt, I confirm that I have read and
                agree to the CenturyArt Terms of Service, Privacy Policy, and to
                receive emails and updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
