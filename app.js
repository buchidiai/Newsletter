const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { key } = require("./keys/prodkey");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const { firstname, lastname, email } = req.body;

  const errorRes = value => `${value} is required`;
  const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!firstname) {
    return res.status(400).json(errorRes(firstname));
  }
  if (!lastname) {
    return res.status(400).json(errorRes(lastname));
  }
  if (!email) {
    return res.status(400).json(errorRes(email));
  }

  if (emailReg.test(email) === false) {
    return res.status(400).json(errorRes(email));
  }

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: firstname, LNAME: lastname }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  console.log(key, "key");

  const options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/994a9c2dd6",
    method: "POST",
    headers: {
      Authorization: `test53 ${key}`
    },
    body: jsonData
  };

  request(options, (err, response, body) => {
    if (err) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      console.log(response.statusCode, "resp");
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/sucess.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
