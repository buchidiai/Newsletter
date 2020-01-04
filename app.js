const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
