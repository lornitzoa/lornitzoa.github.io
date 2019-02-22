// Dependencies
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection;
const session = require('express-session')

// allos Heroku's port or local port
const PORT = process.env.PORT ||  3000;

// Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pantry';

// Connect to MONGODB_URI
mongoose.connect(MONGODB_URI, {useNewUrlParser: true})

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
db.once('open', () => {
  console.log('Connected to mongo');
})



// Middleware
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(session({
  secret: 'potatohoe',
  resave: false,
  saveUnintialized: false
}))

// Routes
const Food = require('./models/food_model.js');
const Seed = require('./controllers/seed.js');

const foodController = require('./controllers/food.js');
app.use('/pantry', foodController); // pantry is main foods list page.




// Listener
app.listen(PORT, () => {
  console.log(`Connected to port: ${PORT}`);
})
