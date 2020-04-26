const express = require('express');
const cors = require('cors');
const apiUser = require('./routes/userController');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api/user', apiUser);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


global.generateID = () => '_' + (Date.now().toString(36) + Math.random().toString(36)).substr(2, 9);

