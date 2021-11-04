import React, { useState, useEffect } from 'react';
//import notes from '../assets/data'
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

const taskURL = 'http://localhost:3000/task';

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
    setNotes(data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Your ToDo's</h2>
        <p className="notes-count">{notes.length}</p>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>

      <AddButton />
    </div>
  );
};

export default Notes;
