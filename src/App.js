import "./App.css";
import noteService from "./services/noteService";
import { useState, useEffect } from "react";
const App = () => {
  //For Display
  const [notes, setNotes] = useState([]);
  const [notes2, setNotes2] = useState([]);
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("");
  //For New input
  const [newCategory, setCategory] = useState("Important");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(response.data);
      setNotes2(response.data);
    });
  }, []);

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

  const filterCategories = {
    category: [
      {
        name: "Journal",
      },
      {
        name: "Important",
      },
      {
        name: "To-Do",
      },
      {
        name: "Show All",
      },
    ],
  };

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value);
  };

  const handleNewContent = (event) => {
    setNewContent(event.target.value);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleDelete = (id) => {
    noteService.del(id).then((response) => {
      setNotes(notes.filter((e) => e.id !== id));
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newNote = {
      date: new Date().toString(),
      title: newTitle,
      content: newContent,
      category: newCategory,
      id: Math.random(),
    };

    noteService.create(newNote).then((response) => {
      setNotes(notes.concat(newNote));
    });
  };
  const handleSave = (id) => {
    const currNote = notes.find((e) => e.id === id);
    const newNote = {
      ...currNote,
      content: content,
    };
    setNotes(notes.map((e) => (e.id === id ? newNote : e)));
  };

  const handleFilter = (noteType) => {
    if (noteType !== "Show All" && notes2 !== undefined) {
      setNotes(notes2.filter((e) => e.category === noteType));
    } else {
      setNotes(notes2);
    }
  };

  return (
    <>
      <div style={{ display: "block" }}>
        <h3>New Note</h3>
        <input onChange={handleNewTitle} placeholder="Title"></input>
        <textarea
          onChange={handleNewContent}
          placeholder="Content"
          rows="6"
          cols="40"
        ></textarea>
        <select defaultValue="Important" onChange={handleCategory}>
          <option value="Important">Important</option>
          <option value="Journal">Journal</option>
          <option value="To-Do">To-Do</option>
        </select>

        <button onClick={handleSubmit}>Save</button>
      </div>

      <h3>Filter Notes</h3>
      {filterCategories.category.map((e) => (
        <FilterButtons category={e} handleFilter={handleFilter} />
      ))}

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

const FilterButtons = ({ category, handleFilter }) => {
  return (
    <button onClick={() => handleFilter(category.name)}>{category.name}</button>
  );
};

const Card = ({ notes, handleContent, handleDelete, handleSave }) => {
  return (
    <>
      <div className="card">
        <h3>
          "{notes.title}" - {notes.date} - {notes.category}
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
