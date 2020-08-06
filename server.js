const express = require('express');
const bodyParser = require('body-parser');
const DbModule = require('./config/database'); // Database
const db = DbModule.sequelize;
const PORT = process.env.PORT || 5000;
const app = express();
const userRouter = require('./routes/Users')


app.use(bodyParser.json())
// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

app.use(bodyParser.urlencoded({ extended: false })); // Body Parser
app.use('/users',userRouter)

// Index route
app.get('/', (req, res) => {res.send("index: Backend is running")});

app.listen(PORT, console.log(`Server started on port ${PORT}`));