const express = require("express");
const path = require("path");
console.log(__dirname, path.join(__dirname, "./build"));

const app = express(),
  port = process.env.PORT || 3002;

app.use(express.static(path.join(__dirname, "./build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(port, (_) => console.log("Server running on port", port));
