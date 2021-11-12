import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="app-header">
      <Link style={{ textDecoration: 'none' }} to="/tasks">
        <h1>Minha Agenda</h1>
      </Link>
      <Link to="/">
        <Button variant="outline-danger">Sair</Button>
      </Link>
    </div>
  );
};

export default Header;
