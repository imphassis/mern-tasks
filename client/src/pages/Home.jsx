import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

const URL = process.env.REACT_APP_URL;
const PORT = process.env.REACT_APP_PORT;

const taskURL = `${URL}/task`;
console.log(taskURL, PORT);

const Notes = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch(taskURL, {
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
