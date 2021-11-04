import React, { useEffect, useState } from 'react';
//import notes from '../assets/data'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const user = {
  email: 'erickjacquin@gmail.com',
  password: '12345678',
};

const Note = ({ match, history }) => {
  let noteId = match.params.id;

  const [task, setTask] = useState(null);
  const [token, setToken] = useLocalStorage('token', null);
  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useState('');

  useEffect(() => {
    getNote();
    getToken();
  }, [noteId]);

  let getNote = async () => {
    if (noteId === 'new') return;
    const response = await fetch(`http://127.0.0.1:3000/task/${noteId}`);
    const data = await response.json();
    setTask(data);
  };

  const getToken = async () => {
    if (token) return;
    const response = await fetch(`http://127.0.0.1:3000/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    setToken(data.token);
  };

  const createTask = async (task) => {
    const response = await fetch(`http://127.0.0.1:3000/task/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(task),
    });

    return response;
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
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const date = formData.get('date');
    const newTask = {
      title,
      description,
      date,
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

  console.log(startDate);
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to={'/'}>
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {noteId !== 'new' ? (
          <button form="task-form" type="submit" onClick={deleteTask}>
            Delete
          </button>
        ) : (
          <button form="task-form" type="submit">
            Done
          </button>
        )}
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
            // onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
            timeFormat="HH:mm"
            name="date"
          />
        </Form.Group>
      </Form>
      <h1>{status}</h1>
    </div>
  );
};

export default Note;
