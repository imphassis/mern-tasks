import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import ConfirmDelete from './ConfirmDelete';

const user = {
  email: 'erickjacquin@gmail.com',
  password: '12345678',
};

const Task = ({ match, history }) => {
  let noteId = match.params.id;

  const [task, setTask] = useState(null);
  const [token, setToken] = useLocalStorage('token', null);
  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    getNote();
    getToken();
  }, [noteId]);

  const getNote = async () => {
    if (noteId === 'new') return;

    await fetch(`http://127.0.0.1:3000/task/${noteId}`)
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
        console.log(data);
        setStartDate(new Date(data.date));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getToken = async () => {
    if (token) {
      const date = moment(token.timestamp);
      const now = moment();
      const diff = date.diff(now, 'hours');
      if (diff < 1) {
        return;
      }
    }
    await fetch(`http://127.0.0.1:3000/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setToken({ token: data.token, timestamp: new Date().getTime() });
      })
      .catch((error) => {
        setStatus(error);
      });
  };

  const createTask = (task) => {
    fetch(`http://127.0.0.1:3000/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json().then((data) => console.log(data)))
      .catch((error) => {
        console.log(error, 'ERROR');
        // setStatus(error);
      });
  };

  const updateTask = async (task) => {
    await fetch(`http://127.0.0.1:3000/task/${noteId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(task),
    });
  };

  const deleteTask = async () => {
    await fetch(`http://127.0.0.1:3000/task/${noteId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    history.push('/');
  };

  const handleSubmit = async (e) => {
    console.log(startDate);
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const date = formData.get('date');
    const newTask = {
      title,
      description,
      date: startDate,
      completed: false,
    };
    if (noteId !== 'new' && !task.body) return deleteTask();
    if (noteId !== 'new') return updateTask(newTask);
    if (noteId === 'new' && task !== null) {
      await createTask(newTask);
      setStatus('Task created successfully');
      return setTimeout(() => {
        history.push('/');
      }, 2000);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to={'/'}>
            <ArrowLeft />
          </Link>
        </h3>
        <Button variant="success" form="task-form" type="submit">
          Done
        </Button>
      </div>
      <Form id="task-form" className="m-3" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="title-input mb-3">
          <Form.Label>
            Title
            <Form.Control
              type="text"
              placeholder="My Custom Task"
              name="title"
              value={task ? task.title : ''}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            style={{ height: '100px' }}
            name="description"
            value={task ? task.description : ''}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <DatePicker
            className="date-input"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
            timeFormat="HH:mm"
            name="date"
          />
        </Form.Group>
      </Form>
      <h1>{status}</h1>
      <Button variant="danger" form="task-form" onClick={handleShow}>
        Delete
      </Button>
      <ConfirmDelete show={show} onHide={handleClose} onDelete={deleteTask} />
    </div>
  );
};

export default Task;
