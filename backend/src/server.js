const express = require("express");
const cors = require("cors");
const foodRouter = require("./routers/food.router");
const userRouter = require("./routers/user.router");
const orderRouter = require("./routers/order.router");
const {dbconnect} = require("./config/database.config");
require("dotenv").config();

dbconnect();

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listing on ${PORT}`);
});
