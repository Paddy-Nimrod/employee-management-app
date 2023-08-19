const express = require("express");
const bodyparser = require("body-parser");

const user_routes = require("./routes/users.routes");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
// app.use(user_routes);

app.get("/", (req, res) => {
  res.send({ message: "hello" });
});

app.listen(port, () => {
  console.log(`app running on port: ${port}`);
});
