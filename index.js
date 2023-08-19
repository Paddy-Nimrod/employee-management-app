const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/", (req, res) => {
  res.send({ message: "okay" });
});

app.listen(port, () => {
  console.log(`app running on port: ${port}`);
});
