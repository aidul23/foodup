const express = require("express");
const cors = require("cors");
const foodRouter = require("./routers/food.router");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use("/api/foods", foodRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listing on ${PORT}`);
});
