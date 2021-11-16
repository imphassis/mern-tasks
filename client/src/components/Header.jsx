import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout as logOut } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import useLocalStorage from 'use-local-storage';
import { useHistory } from 'react-router';

const Header = () => {
  // const [token, setToken] = useLocalStorage('token');
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    // setToken('');
    dispatch(logOut());
    history.push('/login');
  };
  return (
    <div className="app-header">
      <Link style={{ textDecoration: 'none' }} to="/">
        <h1>Minha Agenda</h1>
      </Link>
      <Button onClick={logout} variant="outline-danger">
        Sair
      </Button>
    </div>
  );
};

export default Header;
