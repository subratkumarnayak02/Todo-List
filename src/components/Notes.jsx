import React from "react";

const Notes = (props) => {
  const handleUpdate = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    props.setEditing(true);
    props.setEditingId(props.id);
    props.setNoteToBeEdited({
      title: props.title,
      userId: props.userId,
      completed: props.completed.includes("true"),
    });
  };

  return (
    <div className="note">
      <p>{props.id}</p>
      <p>User Id: {props.userId}</p>
      <h1>{props.title}</h1>
      <p>{props.completed}</p>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={() => props.onDelete(props.id)}>Delete</button>
    </div>
  );
};

export default Notes;
