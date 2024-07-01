const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./setupDB');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/tasks', (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO tasks (name, description) VALUES (?, ?)';
  db.run(query, [name, description], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, name, description });
  });
});

app.put('/tasks/:id', (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  const query = 'UPDATE tasks SET name = ?, description = ? WHERE id = ?';
  db.run(query, [name, description, id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id, name, description });
  });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.run(query, id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Task deleted' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
