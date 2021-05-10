const express = require("express");
const path = require("path");
const tabletojson = require("tabletojson").Tabletojson;

const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/data", async function (req, res) {
  const url =
    "https://www.gov.uk/guidance/providers-of-day-2-and-day-8-coronavirus-testing-for-international-arrivals";

  const data = await tabletojson.convertUrl(url, (tablesAsJson) => {
    if (tablesAsJson.length > 1) {
      throw new Error("More than one table present");
    }
    return tablesAsJson;
  });

  console.log("sending...");

  res.json(data);
});

app.listen(process.env.PORT || 8080);
