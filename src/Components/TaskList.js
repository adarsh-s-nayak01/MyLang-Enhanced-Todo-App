import React from "react";
import Task from "./Task";

//TaskList functional component which represents a list of tasks
const TaskList = ({ tasks, onDelete, onToggle }) => {
  return (
    <div>
      {/* Map through the tasks array and render a Task component for each task */}
      {tasks.map((task) => (
        // Pass the task details, onDelete, and onToggle functions as props to the Task component
        <Task
          key={task.id} //unique id as the key for efficient rendering
          task={task} // Pass the task object as a prop
          onDelete={onDelete} // onDelete function as a prop
          onToggle={onToggle} // onToggle function as a prop
        />
      ))}
    </div>
  );
};

export default TaskList;
