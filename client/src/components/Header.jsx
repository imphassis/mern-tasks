// @ts-nocheck
import React, { useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout as logOut, saveUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userData } = useSelector((state) => state.user);

  const checkUser = useCallback(async () => {
    if (!userData) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.user) {
        dispatch(saveUser(user.user));
      }
    }
  }, [dispatch, userData]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const logout = () => {
    localStorage.removeItem('user');
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
