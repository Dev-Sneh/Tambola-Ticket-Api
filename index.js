const express = require('express');
const { connection } = require('./config/db');
const { userRoute } = require('./routes/userrouter');
const { ticketRoute } = require('./routes/ticketrouter');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Tambola Ticket Server');
});
app.use('/api/auth', userRoute);
app.use('/api/ticket', ticketRoute);
app.listen(3000, async () => {
  try {
    await connection;
    console.log('Db connected');
  } catch (err) {
    console.log(err.message);
  }
  console.log('http://localhost:3000/');
});
