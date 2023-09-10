const express = require("express");
const bodyparser = require("body-parser");

const db = require("./models/index");

const staff_routes = require("./routes/staff.routes");
const member_routes = require("./routes/member.routes");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(express.json());

app.use(staff_routes);
app.use(member_routes);

(async () => {
  await db.sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`app running on port: ${port}`);
    });
  });
})();
