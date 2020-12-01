const express = require('express');
const mongoose =  require('mongoose');
const cookieParser =  require('cookie-parser');
const path = require('path')
const roomsRoute = require('./routes/rooms')
const boardersRoute = require('./routes/boarders')
const userRoute = require('./routes/user')
const verifyToken =  require('./middlewares/VerifyToken');

require('dotenv').config()
const app = express();
app.use(cookieParser());
app.use(express.json());



// ------------------------ ROUTES ------------------------ //
app.use('/api/rooms', verifyToken, roomsRoute);
app.use('/api/boarders', verifyToken, boardersRoute);
app.use('/api/users', userRoute);


console.log(path.resolve(__dirname, 'client', 'build', 'index.html'));

// --------------- DATABASE REALTED THINGY ---------------- //
const URI  = process.env.DB_STRING
const PORT = process.env.PORT || 4000

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} 

try {
    mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
}

app.listen(PORT);