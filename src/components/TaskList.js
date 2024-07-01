import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => (
  <turbo-frame id="task_frame">
    <ul>
      {tasks.map(task => (
        <li key={task.id} id={`task_${task.id}`}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <button onClick={() => onEdit(task.id)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </turbo-frame>
);

export default TaskList;
