import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TasksFilter from "./components/TasksFilter";
import CreateTaskForm from "./components/CreateTaskForm";
import TodoList from "./components/TodoList";

function App() {
  //---------------------------------------------//
  useEffect(() => {
    getSavedTheme();
    getSavedTodos();
    console.log("Tell Cercei. It was me :) ");
  }, []);
  //---------------------------------------------//
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");
  //---------------------------------------------//
  //------------ TOGGLE LIGHT/DARK THEME --------//
  const toggleThemeHandler = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  const getSavedTheme = () => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", theme);
    } else {
      let localTheme = localStorage.getItem("theme");
      setTheme(localTheme);
    }
  };
  //---------------------------------------------//
  useEffect(() => {
    filterHandler();
    setCount(tasks.length);
  }, [tasks, filterStatus]);

  //---------------------------------------------//
  //------ GET TASKS FROM POSGRESS DATABASE ------//
  const getSavedTodos = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setTasks((prevTasks) => {
        return data.map((task) => {
          return { ...task, task };
        });
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  //---------------------------------------------//
  //------------ FILTER ITEMS BY STATUS --------//
  const filterHandler = (e) => {
    if (filterStatus === "completed") {
      setFilteredTasks(tasks.filter((task) => task.status === "completed"));
    } else if (filterStatus === "active") {
      setFilteredTasks(tasks.filter((task) => task.status === "active"));
    } else {
      setFilteredTasks(tasks);
    }
  };
  //-------------------------------------------//
  //---------- DELETE COMPETED TASKS ----------//
  const deleteHandler = async (e) => {
    try {
      const toDelete = await fetch(`http://localhost:5000/todos`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.status !== "completed"));
    } catch (err) {
      console.error(err.message);
    }
  };
  //-------------------------------------------//

  return (
    <div className="App" data-them={theme}>
      <main>
        <Header toggleThemeHandler={toggleThemeHandler} />
        <CreateTaskForm
          text={text}
          setText={setText}
          tasks={tasks}
          setTasks={setTasks}
          count={count}
          setCount={setCount}
          getSavedTodos={getSavedTodos}
        />
        <TodoList
          tasks={tasks}
          setTasks={setTasks}
          filteredTasks={filteredTasks}
          getSavedTodos={getSavedTodos}
          text={text}
        />
        <TasksFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          deleteHandler={deleteHandler}
          count={count}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
