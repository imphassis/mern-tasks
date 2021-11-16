// @ts-nocheck
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useLocalStorage from 'use-local-storage';
import * as moment from 'moment';

import LoginForm from '../components/LoginForm';
const URL = process.env.REACT_APP_URL;

const user = {
  email: 'erickjacquin@gmail.com',
  password: '12345678',
};

export default function Login() {
  const [token, setToken] = useLocalStorage('token', null);
  const [status, setStatus] = useState('');
  const { info: user, logged } = useSelector((state) => state.user);

  useEffect(() => {
    getToken();
  }, []);

  const NEWURL = 'http://localhost:5000/api';
  const getToken = async () => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`${NEWURL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        console.log('vrau');
        const data = await response.json();
        setToken({ token: data.token, timestamp: new Date().getTime() });
      } catch (error) {
        setStatus(error);
      }
    };
    const diff = () => {
      if (!token) return false;
      const date = moment(token.timestamp) || null;
      const now = moment() || null;
      // Display the time difference in minutes
      return moment.duration(now.diff(date)).as('minutes') || null;
    };
    if (!token || diff() > 180) {
      fetchToken();
    }

    // Display the date when the token was created
  };

  const helloUser = () => {
    return logged ? (
      <div className="alert alert-success" role="alert">
        Bem vindo {user.email}
      </div>
    ) : null;
  };

  return (
    <div>
      <LoginForm />
      {helloUser()}
    </div>
  );
}
