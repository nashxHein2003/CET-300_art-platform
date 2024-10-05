import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
} from '../../../components/Icons/Icons';
import { Link, useNavigate } from 'react-router-dom';
import { supabaseClient } from './../../../services/supaBase';

const RegisterView = () => {
  const navigate = useNavigate();
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
      // Sign up the user using Supabase Auth
      const { user, session, error } = await supabaseClient.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
        },
        {
          redirectTo: 'http://localhost:3000', // You can set the redirect URL here (for after login).
        }
      );

      if (error) {
        throw error;
      }

      if (session) {
        console.log('User session:', session);
        alert('User registered without email confirmation required.');
      }

      // Check if user is successfully registered
      if (user) {
        console.log('User signed up:', user);

        // Insert user information into the custom user table
        const { data, error: dbError } = await supabaseClient
          .from('user') // Replace with your actual table name
          .insert([
            {
              user_id: user.id, // Link to the auth user by ID
              email: formData.email,
            },
          ]);

        if (dbError) {
          console.error('Error inserting into user table:', dbError.message);
          throw dbError; // Rethrow to catch in the outer error handler
        }

        console.log('User data successfully inserted into custom table:', data);

        alert('Registration successful! Please check your email to confirm.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="w-full h-lvh bg-dark-primary-theme grid place-items-center">
      <div className="w-1/2 h-5/6 bg-white flex flex-row">
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
            <h1 className="text-4xl font-bold mb-10">Join CenturyArt</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label htmlFor="title" className="text-sm font-bold">
                Add your Email
              </label>
              <input
                type="email"
                name="email"
                className="w-auto p-2 border mt-1 mb-3"
                onChange={handleChange}
              />
              <label htmlFor="title" className="text-sm font-bold">
                Choose your password
              </label>
              <input
                type="password"
                name="password"
                className="w-full p-2 border mt-1 mb-3"
                onChange={handleChange}
              />
              <div className="w-full flex flex-row mb-3  relative">
                <label className="inline-flex items-center">
                  <span className="text-xs text-gray-500">
                    Min 6 characters, numbers & letters
                  </span>
                </label>
              </div>
              <button
                className="w-full p-3 bg-dark-primary text-sm text-white"
                type="submit"
              >
                Continue with Email
              </button>
            </form>

            <div className="relative w-full flex flex-row justify-center items-center mb-3 mt-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="bg-white text-sm px-4 text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="flex flex-col items-start">
              <button className="relative flex items-center w-full p-3 border mb-3">
                <GoogleIcon className="absolute left-0" />
                <span className="w-full text-center text-sm">
                  Continue with Google
                </span>
              </button>

              <button className="relative flex items-center w-full p-3 border mb-3">
                <FacebookIcon className="absolute left-0" />
                <span className="w-full text-center text-sm">
                  Continue with Facebook
                </span>
              </button>

              <button className="relative flex items-center w-full p-3 border mb-3">
                <AppleIcon className="absolute left-0" />
                <span className="w-full text-center text-sm">
                  Continue with Apple
                </span>
              </button>

              <p className="text-xs font-normal flex items-center">
                Already a member?
                <button className="ml-2" onClick={() => navigate('/login')}>
                  <span className="text-sm font-bold text-dark-primary ">
                    Log in your account
                  </span>
                </button>
              </p>

              <p className="text-xs font-normal text-gray-600 mt-12">
                By joining CenturyArt, I confirm that I have read and agree to
                the CenturyArt Terms of Service, Privacy Policy, and to receive
                emails and updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
