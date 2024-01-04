import React from "react";
import "../App.css";

//Task functional component which represents an individual task
const Task = ({ task, onDelete, onToggle }) => {
  // Function to handle the toggle (complete/uncomplete) of a task
  const handleToggle = () => {
    // Call the onToggle function with the task's id
    onToggle(task.id);
  };

  return (
    <div className="task-container">
      <div className="task-content">
        <div className={`task ${task.completed ? "completed" : ""}`}>
          {/* Task text with styles for completion and font properties */}
          <h5
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "grey" : "black",
              fontStyle: "normal",
              fontFamily: "sans-serif",
              fontWeight: "normal",
              fontSize: "16px",
            }}
          >
            {task.text}
          </h5>
        </div>
      </div>

      <div className="button-container">
        {/* Complete button with dynamic class based on completion status */}
        <button
          className={`complete-button ${task.completed ? "completed" : ""}`}
          onClick={handleToggle}
        >
          {task.completed ? "Completed" : "Complete"}
        </button>
        {/* Delete button with onClick event to delete the task */}
        <button className="delete-button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
