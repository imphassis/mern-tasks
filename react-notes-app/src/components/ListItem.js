import React from 'react';
import { Link } from 'react-router-dom';

let getTime = (note) => {
  console.log(note.date);

  return new Date(note.date).toLocaleDateString();
};

let getTitle = (note) => {
  //spit by new lines and just get the first line
  //split will make a list of each line and will only pull on the first line by index zero
  const title = note.title.split('\n')[0];
  if (title.length > 45) {
    return title.slice(0, 45);
  }
  return title;
};

let getContent = (note) => {
  //Get content after title
  let title = getTitle(note);
  let content = note.description.replaceAll('\n', '');
  content = content.replaceAll(title, '');

  //Slice content and add three dots in over 45 characters to show there is more
  if (content.length > 50) {
    return content.slice(0, 50) + '. . .';
  } else {
    return content;
  }
};

const ListItem = ({ note }) => {
  const { _id: id } = note;

  return (
    <Link className="item" to={`/note/${id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          {getContent(note)}
          <span>{getTime(note)}</span>
        </p>
      </div>
    </Link>
  );
};

export default ListItem;
