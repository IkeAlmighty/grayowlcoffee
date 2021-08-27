// sends test requests to localhost:3000
const fetch = require("node-fetch");

const host = "localhost";
const port = "3000";
const testPost = {};

fetch(`http://${host}:${port}/edit`, { method: "POST", body: testPost })
  .then((res) => res)
  .then((json) => console.log(json));
