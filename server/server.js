import express from "express";
const app = express();
const port = 3001;
import fetch from "node-fetch";

import { config as dotEnv } from "dotenv";

dotEnv();

const { API_KEY } = process.env;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/weather/:city", async (req, res) => {
  const city = req.params.city;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  const data = await response.json();

  res.status(200).json({ data });
});

app.get("/api/cities/:province", async (req, res) => {
  const province = req.params.province;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      country: "Canada",
      state: province,
    }),
  };

  const response = await fetch(
    "https://countriesnow.space/api/v0.1/countries/state/cities",
    requestOptions
  );

  const data = await response.json();

  res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
