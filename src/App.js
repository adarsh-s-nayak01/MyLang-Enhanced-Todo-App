import React, { useState, useEffect } from "react";
import TaskList from "./Components/TaskList";
import "./App.css";

//main functional component App
const App = () => {
  // Load tasks from local storage on initial render, or set to an empty array if not available
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // State variables for tasks, new task input, and greeting message
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [greeting, setGreeting] = useState("");

  // useEffect hook to update greeting and save tasks to local storage when tasks change
  useEffect(() => {
    // Get the current hour for determining the time of day
    const currentHour = new Date().getHours();
    let timeOfDay;

    //the time of day based on the current hour
    if (currentHour >= 5 && currentHour < 12) {
      timeOfDay = "morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      timeOfDay = "afternoon";
    } else {
      timeOfDay = "evening";
    }

    //the completion status of tasks
    const completedTasks = tasks.filter((task) => task.completed);
    const tasksCount = tasks.length;
    const completedCount = completedTasks.length;

    // Customize the greeting based on the time of day and completion status
    if (tasksCount === 0) {
      setGreeting(
        `Good ${timeOfDay}! Looks like you have no tasks. Wanna get some tasks done?`
      );
    } else if (completedCount === tasksCount) {
      setGreeting(`Good ${timeOfDay}! Congratulations! All tasks completed!`);
    } else if (completedCount === 0) {
      setGreeting(
        `Good ${timeOfDay}! You have ${tasksCount} tasks. Let's get started!`
      );
    } else {
      setGreeting(
        `Good ${timeOfDay}! You've completed ${completedCount} out of ${tasksCount} tasks. Keep it up!`
      );
    }

    // Save tasks to local storage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task to the tasks state
  const addTask = () => {
    // Check if the new task is not an empty string
    if (newTask.trim() !== "") {
      // Add a new task to the tasks state with a unique id, task text, and completed status
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      // Clear the new task input field
      setNewTask("");
    }
  };

  // Function to delete a task from the tasks state based on its id
  const deleteTask = (taskId) => {
    // Filter out the task with the specified id and update the tasks state
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Function to toggle the completion status of a task based on its id
  const toggleTask = (taskId) => {
    // Map through the tasks state and toggle the completed status of the task with the specified id
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Render the main application structure
  return (
    <div className="AppContainer">
      <h1>Enhanced Todo List</h1>
      {/* Display the personalized greeting message */}
      <p>{greeting}</p>
      {/* Input container for adding a new task */}
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </div>
      {/* Button to add a new task */}
      <button
        onClick={addTask}
        style={{
          backgroundColor: "#007FFF",
        }}
      >
        Add Task
      </button>
      {/* TaskList component to display the list of tasks */}
      <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  );
};

export default App;
