const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const { firstname, lastname, email } = req.body;

  const errorRes = value => `${value} is required`;

  if (!firstname) {
    return res.status(400).json(errorRes(firstname));
  }
  if (!lastname) {
    return res.status(400).json(errorRes(lastname));
  }
  if (!email) {
    return res.status(400).json(errorRes(email));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
