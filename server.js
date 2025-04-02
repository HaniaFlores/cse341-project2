const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./config/database.js');
const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/users', require('./routes/users.js'));
app.use('/tasks', require('./routes/tasks.js'));

// TEST
app.get('/', (req, res) => {
    res.send('Hello World');
})


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
});