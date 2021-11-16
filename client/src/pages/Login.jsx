import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
const URL = process.env.REACT_APP_URL;

const user = {
  email: 'erickjacquin@gmail.com',
  password: '12345678',
};

export default function Login() {
  const [token, setToken] = useLocalStorage('token', null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    getToken();
  }, []);

  const getToken = useCallback(async () => {
    // if (token) {
    //   const date = moment(token.timestamp);
    //   const now = moment();
    //   const diff = date.diff(now, 'hours');
    //   if (diff < 1) {
    //     return;
    //   }
    // }
    try {
      if (!token) {
        const response = await fetch(`${URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        const data = await response.json();
        setToken({ token: data.token, timestamp: new Date().getTime() });
      }
    } catch (error) {
      setStatus(error);
    }
  }, []);

  return (
    <Form className="m-3">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Digite seu e-mail:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Digite sua senha:</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
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
