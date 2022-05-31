require("dotenv/config");

const express = require("express");
const app = express();

const cors = require("cors");
const routes = require("./routes");

require("./database");

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log(
    `Server is running at http://localhost:${process.env.PORT || 3333}`
  );
});
