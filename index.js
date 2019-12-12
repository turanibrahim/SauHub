const express = require('express');
const db = require('./config/database');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const categoryRoute = require('./routes/category');
const app = express();

//ENV config
dotenv.config();

//TEST DB CONNECTION
db.authenticate()
    .then(() => console.log('basarili'))
    .catch(err => console.log(err));
// SYNC DB FOR CREATING TABLE
db.sync({ force: false });

//Middleware
app.use(express.json());

//Test Index
app.get('/', (req,res) => {
    res.send('There is a index page');
})

//USER ROUTES
app.use('/api/user/', authRoute);
app.use('/api/category/',categoryRoute);




var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number, console.log('server started on port' + port_number));