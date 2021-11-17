// @ts-nocheck
import React, { useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout as logOut, saveUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router';
import useToken from './useLocalStorage';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = history.location;

  const [user, setUser] = useToken('');
  const { info, userData } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(pathname);
    if (pathname !== '/login' && !user) {
      history.push('/login');
    }
  }, [history, pathname, user]);

  const logout = () => {
    setUser('');
    dispatch(logOut());
    history.push('/login');
  };
  return (
    <div className="app-header">
      <Link style={{ textDecoration: 'none' }} to="/">
        <h1>Minha Agenda</h1>
        <h5>{userData?.name}</h5>
      </Link>
      <Button onClick={logout} variant="outline-danger">
        Sair
      </Button>
    </div>
  );
};

export default Header;
