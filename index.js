const express = require('express');

const  userRoutes  = require('./routes/users.js');

const app = express();

require('dotenv').config();
const PORT = process.env.HTTP_PORT;

app.use(express.json());

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is up and running at http://localhost:${PORT}`);
});
