// @ts-nocheck
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login } from '../store/userSlice';
import { useDispatch } from 'react-redux';

export default function LoginForm() {
  const [user, setUser] = useState({ username: '', password: '' });
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const email = data.get('email');
    const password = data.get('password');
    const user = {
      email,
      password,
    };

    dispatch(login({ email, password }));

    // setUser({ email, password });
  };

  return (
    <Form className="m-3" onSubmit={(e) => submitForm(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Digite seu e-mail:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Digite sua senha:</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" />
      </Form.Group>
      <Button
        className="col-12 mb-3 mb-sm-0"
        variant="outline-success"
        type="submit"
      >
        Entrar
      </Button>
      <Link to="/register">
        <Button
          className="col-12 mt-3 mb-sm-0"
          variant="outline-primary"
          type="submit"
        >
          Novo Usuário
        </Button>
      </Link>
    </Form>
  );
}
