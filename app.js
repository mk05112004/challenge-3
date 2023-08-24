const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const tasks = [];

app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/addTask', (req, res) => {
    const { task } = req.body;
    tasks.push({ description: task, completed: false });
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
