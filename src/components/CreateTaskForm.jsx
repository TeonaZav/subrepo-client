import React from "react";
import "./CreateTaskForm.css";

function CreateTaskForm({
  tasks,
  setTasks,
  count,
  setCount,
  text,
  setText,
  getSavedTodos,
}) {
  const handleContentChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value !== "" || value !== undefined) {
      e.target.nextElementSibling.disabled = false;
    }
    setText(value);
  };
  const submitTask = async (e) => {
    e.preventDefault();
    e.target.firstElementChild.nextElementSibling.disabled = true;
    setTasks([...tasks, { text: text, status: "active" }]);
    setText("");
    setCount(count + 1);
    try {
      const body = { text };
      const response = await fetch("https://todoserver123.onrender.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      getSavedTodos();
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <form id="form" onSubmit={submitTask}>
        <input
          className="text-field"
          type="text"
          autoComplete="off"
          placeholder="Create a new todo…"
          onChange={handleContentChange}
          value={text}
        />
        <button
          type="submit"
          form="form"
          className="btn btn-create-item"
          disabled
        ></button>
      </form>
    </div>
  );
}

export default CreateTaskForm;
