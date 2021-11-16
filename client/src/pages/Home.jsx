import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';
import { useHistory } from 'react-router';
import useLocalStorage from 'use-local-storage';

const URL = process.env.REACT_APP_URL;

const taskURL = `${URL}/task`;

const Notes = () => {
  const [notes, setNotes] = useState([]);
  // const [token, setToken] = useLocalStorage('token', null);
  const history = useHistory();

  useEffect(() => {
    // checkUser();
    getNotes();
  }, []);

  // const checkUser = () => {
  //   if (token) {
  //     return true;
  //   }
  //   history.push('/login');
  // };

  const getNotes = async () => {
    const response = await fetch(taskURL, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'cors',
    });

    let data = await response.json();
    data = data.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
    });

    setNotes(data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Lista de Tarefas</h2>
        <p className="notes-count">{notes.length}</p>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => {
          return <ListItem key={index} note={note} />;
        })}
      </div>

      <AddButton />
    </div>
  );
};

export default Notes;
