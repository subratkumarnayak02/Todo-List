import axios from "axios";
import React, { useState, useEffect } from "react";

const CreateArea = (props) => {
  const [note, setNote] = useState({
    userId: "",
    title: "",
    completed: false,
  });

  useEffect(() => {
    if (props.isEditing) {
      setNote(props.noteToBeEdited);
    }
  }, [props.noteToBeEdited, props.isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: name === "completed" ? value === "true" : value,
    }));
  };
  const submitNote = (e) => {
    e.preventDefault();
    if (props.isEditing) {
      props.onUpdate(note.title, note.completed);
    } else {
      makeApiCallToAdd();
    }
    setNote({
      userId: "",
      title: "",
      completed: false,
    });
  };

  const makeApiCallToAdd = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        note
      );
      console.log(response.data);
      props.onAdd(response.data);
      alert("Post created successfully.");
    } catch (e) {
      console.log(e);
      alert("An Error occurred while creating the post.");
    }
  };
  return (
    <div>
      <form id="mainform" onSubmit={submitNote}>
        <input
          type="number"
          required
          name="userId"
          value={note.userId}
          onChange={handleChange}
          placeholder="User Id"
          disabled={props.isEditing}
        />
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Task"
          required
        />
        <label>
          Completed
          <select
            name="completed"
            onChange={handleChange}
            value={note.completed ? "true" : "false"}
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </label>
        <button
          onClick={(e) => {
            return (
              setNote({
                userId: "",
                title: "",
                completed: false,
              }),
              e.preventDefault()
            );
          }}
        >
          Clear
        </button>
        <button type="submit">{props.isEditing ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default CreateArea;
