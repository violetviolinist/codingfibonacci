const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

const questionsRoute = require('./routes/questions.routes');

/*  MongoDB stuff  */
const mongoose = require('mongoose');
// let dev_db_url = 'mongodb://localhost:27017/sports/';
let dev_db_url = 'mongodb+srv://jay:jaydahisar@cluster0-l6v6u.mongodb.net/test?retryWrites=true&w=majority';
let mongoDB = dev_db_url;
mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, (err, db) => {
    if(err){
        throw err;
    }
    console.log("Mongo connected");
});
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/questions', questionsRoute);

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/test', (req, res) => {
    res.send('Server is up!');
});

app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
});