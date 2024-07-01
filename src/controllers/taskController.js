import { connectDB, listTasks, insertTask, updateTask, deleteTask } from '../setupDB';

export async function getTasks() {
  return new Promise((resolve) => {
    listTasks((tasks) => {
      resolve(tasks);
    });
  });
}

export async function addTask(name, description) {
  return new Promise((resolve) => {
    insertTask(name, description, (id) => {
      resolve({ id, name, description });
    });
  });
}

export async function editTask(id, name, description) {
  return new Promise((resolve) => {
    updateTask(id, name, description, () => {
      resolve({ id, name, description });
    });
  });
}

export async function removeTask(id) {
  return new Promise((resolve) => {
    deleteTask(id, () => {
      resolve(id);
    });
  });
}
