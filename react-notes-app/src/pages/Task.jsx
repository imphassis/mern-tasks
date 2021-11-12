import React, { useEffect, useState } from 'react';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { Button } from 'react-bootstrap';
import * as moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import ConfirmDelete from './ConfirmDelete';
import TaskForm from '../components/TaskForm';
const URL = process.env.REACT_APP_URL;

const Task = ({ match, history }) => {
  let noteId = match.params.id;

  const [task, setTask] = useState(null);
  const [token] = useLocalStorage('token', null);
  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    getNote();
  }, [noteId]);

  const getNote = async () => {
    try {
      if (noteId === 'new') return;
      const response = await fetch(`${URL}/task/${noteId}`);
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = (task) => {
    fetch(`${URL}/task`, {
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
    try {
      const response = await fetch(`${URL}/task/${noteId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token.token,
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      const date = moment(data.date).format('MMMM Do YYYY, h:mm:ss a');

      setStatus(`Task updated at ${date}`);

      return setTimeout(() => {
        history.push('/');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    console.log(task);
    console.log('DELETED');
    // await fetch(`${URL}/task/${noteId}/`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: token,
    //   },
    // });
    // history.push('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const newTask = {
      title,
      description,
      date: startDate,
      completed: false,
    };
    // if (noteId !== 'new' && !task.body) return deleteTask();
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

      <TaskForm
        setTask={setTask}
        task={task}
        handleSubmit={handleSubmit}
        startDate={startDate}
        setStartDate={setStartDate}
      />
      <h4>{status}</h4>
      <Button variant="danger" form="task-form" onClick={handleShow}>
        Delete
      </Button>
      <ConfirmDelete show={show} onHide={handleClose} onDelete={deleteTask} />
    </div>
  );
};

export default Task;
