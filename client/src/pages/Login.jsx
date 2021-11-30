// @ts-nocheck
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as moment from 'moment';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { saveUser } from '../store/userSlice';
import useToken from '../components/useLocalStorage';

const URL = process.env.REACT_APP_URL;

// const user = {
//   email: 'erickjacquin@gmail.com',
//   password: '12345678',
// };

export default function Login() {
  const [user, setUser] = useToken('');
  const [status, setStatus] = useState('');
  const { info, logged } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const getToken = useCallback(async () => {
    const fetchToken = async () => {
      if (info) {
        try {
          const response = await fetch(`${URL}/user/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
          });

          const data = await response.json();
          setUser({
            token: data.token,
            timestamp: new Date().getTime(),
            user: data.user,
          });
          dispatch(saveUser(data.user));
        } catch (error) {
          setStatus(error);
        }
      }
    };

    const diff = () => {
      if (!user) return false;
      const date = moment(user.timestamp) || null;
      const now = moment() || null;
      // Display the time difference in minutes
      return moment.duration(now.diff(date)).as('minutes') || null;
    };
    if (!user || diff() > 180) {
      fetchToken();
    }
  }, [dispatch, info, setUser, user]);

  const checkUser = useCallback(() => {
    if (logged) {
      setStatus(user?.user?.name);
      setTimeout(() => {
        setStatus(null);
        history.push('/');
      }, 3000);
    }
  }, [history, logged, user?.user?.name]);

  useEffect(() => {
    getToken();
    checkUser();
  }, [checkUser, getToken]);

  return (
    <div>
      <LoginForm />
      {status && (
        <div className="alert alert-success" role="alert">
          <h1>Bem vindo {status}</h1>
        </div>
      )}
    </div>
  );
}
