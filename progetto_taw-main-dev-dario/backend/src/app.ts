import './db';
import './middleware/auth'
import userApi from './routes/users'

import bookApi from './routes/books'

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const cors = require('cors');
// Middleware to parse incoming JSON request bodies
// Middleware

app.use(bodyParser.json());
app.use(cors()); // Allow all origins by default

// Session setup
app.use(session({
  secret: 'pass123', // Replace with a secure random string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.get('/', (req: any, res: any) => {
    res.send('Oggi si è unito al gruppo anche nicola!');
});
app.use('/users', userApi)

app.use('/book', bookApi)

app.listen(5005, () => {
    console.log('Server is running on port 5005');
});