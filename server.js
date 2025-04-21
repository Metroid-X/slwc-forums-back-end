// Dependencies
const { config } = require('dotenv');
config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const { setRoute } = require('./homebrew-funcs.js');
// const setRoute = homebrew.setRoute;
const authController = require('./controllers/auth.js')
const userController = require('./controllers/users.js')
const profileController = require('./controllers/profiles.js')
const forumController = require('./controllers/forums.js')
const topicController = require('./controllers/topics.js')
const commentController = require('./controllers/comments.js')

const app = express();
const port = process.env.PORT || 3000; 


// establish mongodb connection
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware use section
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routers

app.get('/', (req,res) => {
    const backendInterface = `
        <style> ul {list-style: '  -  ';} li { margin: 8px 0; } </style>
        <h2>Everything is operational</h2>
        <ul>
            ${setRoute('users', 2)}
            ${setRoute('profiles', 2)}
            ${setRoute('auth', 2)}
            ${setRoute('forum', 2)}
            ${setRoute('gallery', 2)}
        </ul>
    `
    res.send(backendInterface);
});

app.use('/auth', authController);
app.use('/users', userController);
app.use('/profiles', profileController);
app.use('/forums', forumController);
app.use('/topics', topicController);
app.use('/comments', commentController);




app.listen(port, () => {
    console.log(`Express backend is listening on port ${Number(port)}`);
});