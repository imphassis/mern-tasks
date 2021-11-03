import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendInfo } from '../actions';
import LoginForm from '../components/LoginForm';

export default function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendInfo(login));
    history.push('/carteira');
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };

  const handleDisabled = () => {
    const limit = 6;
    const validRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
    );
    if (validRegex.test(login.email) && login.password.length >= limit) {
      return false;
    }
    return true;
  };

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleDisabled={handleDisabled}
    />
  );
}
