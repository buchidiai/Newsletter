if (process.env.NODE_ENV === "production") {
  module.exports = {
    api: process.env.api
  };
} else {
  module.exports = require("./devkey");
}
