const express = require("express");
const app = express();
const port = 9000;
const cors = require("cors");
const fs = require("fs");
// const json = require("body-parser");

app.use(cors());
app.use(express.json());

const file = "./user.json";

app.post("/user", (req, res) => {
  const { name } = req.body;

  console.log(name);

  fs.readFile(file, "utf-8", (readErr, data) => {
    const obj = data ? JSON.parse(data) : [];
    if (readErr) {
      res.json({ status: "false", message: readErr });
    }

    const newUSer = {
      id: obj.user.length + 1,
      name: name,
    };

    obj.user.push(newUSer);

    fs.writeFile(file, JSON.stringify(obj), (err) => {
      if (err) {
        res.json({ status: "false", message: err });
      }
      res.json({ status: true, result: obj });
    });
  });
});

app.delete("/user", (req, res) => {
  res.send("./user.json");
});

app.listen(port, () => {
  console.log("Server is running on" + port);
});
