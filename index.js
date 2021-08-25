const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// Parsing body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const env = require("./src/helpers/env"); // Environment helper
const router = require("./src/routers"); // Router
require("./src/config/db").connect(); // DB connection

router(app); // Perform dynamic routing

app.listen(env.app.port, () => {
  console.log(`${env.app.name} listening at http://localhost:${env.app.port}`);
});
