import React from "react";
import "./TodoList.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TodoList({ tasks, setTasks, filteredTasks, getSavedTodos }) {
  //--------- HANDLE DRAG---------- //
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  }
  //--------- COMPLETE TASKS --------//
  const completeTaskHandler = async (id, status) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          if (task.status === "active") {
            return { ...task, status: "completed" };
          }
          if (task.status === "completed") {
            return { ...task, status: "active" };
          }
        } else {
          return task;
        }
      });
    });
    const body = { status };
    const toUpdate = await fetch(`https://todoserver123.onrender.com/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };
  //--------- DELETE TASK --------//
  const targetDeleteHandler = async (id) => {
    getSavedTodos();
    try {
      const toDelete = await fetch(`https://todoserver123.onrender.com/todos/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="items-container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul
              className="list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTasks.map((item, index) => {
                return (
                  <Draggable
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="item-wrap"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={item.id}
                        key={item.id}
                      >
                        <li
                          className={
                            item.status === "active" ? "item" : "item item-done"
                          }
                        >
                          <button
                            className={
                              item.status === "active"
                                ? "btn item-btn"
                                : "btn item-btn item-btn-done"
                            }
                            onClick={() =>
                              completeTaskHandler(item.id, item.status)
                            }
                          ></button>
                          <p
                            className={
                              item.status === "active"
                                ? "task-text"
                                : "task-text task-text-done"
                            }
                          >
                            {item.text}
                          </p>
                          <div
                            className="icon-cross"
                            onClick={() => targetDeleteHandler(item.id)}
                          ></div>
                        </li>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
export default TodoList;
