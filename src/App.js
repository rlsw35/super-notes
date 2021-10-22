import "./App.css";
import { useState, useEffect } from "react";
const App = () => {
  const notesDemo = {
    notes: [
      {
        id: 1,
        title: "Great Day Today",
        content:
          "This is a long passage intended to showcase some demo notes in the application",
        date: "17-01-2021",
      },
      {
        id: 2,
        title: "Oh my God",
        content:
          "This is a long passage intended to showcase some demo notes in the application",
        date: "17-01-2222",
      },
      {
        id: 3,
        title: "Woah",
        content:
          "This is a long passage intended to showcase some demo notes in the application",
        date: "12-01-2021",
      },
    ],
  };
  const [notes, setNotes] = useState(notesDemo.notes);
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleDelete = (id) => {
    {
      setNotes(notes.filter((e) => e.id !== id));
    }
  };
  const handleSave = (id) => {
    const newNote = notes.filter((e) => e.id === id);
    newNote["content"] = content;
    newNote["date"] = date;
    console.log(newNote);

    setNotes(notes.map((e) => (e.id === id ? newNote : e)));
    console.log(notes);
  };

  return (
    <>
      {notes.map((e) => (
        <Card
          notes={e}
          key={e.id}
          handleDelete={handleDelete}
          handleContent={handleContent}
          handleSave={handleSave}
        />
      ))}
    </>
  );
};

const Card = ({ notes, handleContent, handleDelete, handleSave }) => {
  return (
    <>
      <div className="card">
        <h3>
          "{notes.title}" - {notes.date}
        </h3>

        <textarea
          rows="6"
          cols="40"
          defaultValue={notes.content}
          onChange={handleContent}
        ></textarea>
        <button onClick={() => handleDelete(notes.id)}>Delete</button>
        <button onClick={() => handleSave(notes.id)}>Save</button>
      </div>
    </>
  );
};

export default App;
