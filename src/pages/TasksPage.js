import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';

const API_URL = 'http://localhost:3001';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(`${API_URL}/tasks`);
      const tasks = await response.json();
      setTasks(tasks);
    }
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setName('');
    setDescription('');
  };

  const handleUpdateTask = async (id) => {
    const newName = prompt('New name:');
    const newDescription = prompt('New description:');
    if (newName && newDescription) {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, description: newDescription }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    }
  };

  const handleDeleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task Name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />
        <button type="submit">Add Task</button>
      </form>
      <TaskList tasks={tasks} onEdit={handleUpdateTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default TasksPage;
