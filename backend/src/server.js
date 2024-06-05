const express = require("express");
const cors = require("cors");
const foodRouter = require("./routers/food.router");
const userRouter = require("./routers/user.router");

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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listing on ${PORT}`);
});
