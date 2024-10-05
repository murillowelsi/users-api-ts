import { config } from "dotenv";
import express from "express";

config();

const app = express();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}! 🚀`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
