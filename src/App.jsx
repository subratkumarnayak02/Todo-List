import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import Footer from "./components/Footer";
import Notes from "./components/Notes";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [noteToBeEdited, setNoteToBeEdited] = useState({
    userId: "",
    title: "",
    completed: false,
  });

  const [theme, setTheme] = useState("light");

  const searchNote = async (searchId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${searchId}`
      );
      const data = await response.json();
      setNotes(data);
      console.log(data);
    } catch (e) {
      console.log(e);
      alert("An Error occurred while fetching the data.");
    }
  };

  const addNote = async (newNote) => {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  };
  const deleteNote = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this todo?")) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        alert(`Post Id ${id} deleted successfully.`);
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
      alert("An Error occurred while deleting the note.");
    }
  };

  const updateNote = async (title, completed) => {
    try {
      const updatedNote = { title, completed };
      await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${editingId}`,
        updatedNote
      );

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingId ? { ...note, ...updatedNote } : note
        )
      );

      setEditing(false);
      setEditingId(null);
    } catch (e) {
      console.log(e);
      alert("An Error occurred while updating the note.");
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setNotes(data);
      } catch (e) {
        console.log(e);
        alert("An Error occurred while fetching the data.");
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="App light-dark-mode" data-theme={theme}>
      <Header onSearch={searchNote} />
      <CreateArea
        onAdd={addNote}
        isEditing={editing}
        editingId={editingId}
        onUpdate={updateNote}
        noteToBeEdited={noteToBeEdited}
      />
      <hr />
      {notes?.length > 0 ? (
        <div className="container">
          {notes.map((note) => (
            <Notes
              key={note.id}
              id={note.id}
              userId={note.userId}
              title={note.title}
              completed={`Completed: ${note.completed}`}
              setEditingId={setEditingId}
              setEditing={setEditing}
              onDelete={deleteNote}
              setNoteToBeEdited={setNoteToBeEdited}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No todos found</h2>
        </div>
      )}
      <div className="theme-toggle-container">
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default App;
