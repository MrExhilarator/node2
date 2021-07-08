const express = require("express");

const  userRoutes  = require("./routes/users.js");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/users", userRoutes);

app.listen(PORT, () => console.log(`Server is up and running at http://localhost:${PORT}`));