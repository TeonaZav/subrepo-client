import React from "react";
import "./TasksFilter.css";
function TasksFilter({ setFilterStatus, deleteHandler, count }) {
  const statusHandler = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <div className="container">
      <div className="filter-btn-container">
        <div className="item-left-delete">
          <div className="items-left">
            <span className="number-left" value="5">
              {count}
            </span>
            &nbsp;&nbsp;items left
          </div>
          <div className="clear-completed" onClick={deleteHandler}>
            Clear Completed
          </div>
        </div>

        <form className="filter-form">
          <div className="filter-container">
            <label className="check-label" htmlFor="all">
              <input
                className="check"
                id="all"
                value="all"
                type="radio"
                name="filterBtn"
                onClick={statusHandler}
              />
              <span>All</span>
            </label>

            <label className="check-label" htmlFor="active">
              <input
                className="check"
                id="active"
                value="active"
                type="radio"
                name="filterBtn"
                onClick={statusHandler}
              />
              <span>Active</span>
            </label>

            <label className="check-label" htmlFor="completed">
              <input
                className="check"
                id="completed"
                value="completed"
                type="radio"
                name="filterBtn"
                onClick={statusHandler}
              />
              <span>Completed</span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
export default TasksFilter;
