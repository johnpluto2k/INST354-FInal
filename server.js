const path = require("path");
const express = require("express");
const app = require("./api/index.js");

app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Recipe app running on http://localhost:${port}`);
});
