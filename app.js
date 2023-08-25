const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use('/styles', express.static(path.join(__dirname, 'public', 'styles')));

let tasks = [];
let taskIdCounter = 1;

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/add', (req, res) => {
  const newTask = req.body.newTask;
  tasks.push({ id: taskIdCounter, name: newTask, completed: false });
  taskIdCounter++;
  res.redirect('/');
});

app.post('/complete/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
  }
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

