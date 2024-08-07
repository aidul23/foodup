const path = require('path');
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
    origin: ["https://zippy-swan-6f36d1.netlify.app"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

// app.use("/api/foods", foodRouter);
// app.use("/api/users", userRouter);
// app.use("/api/orders", orderRouter);

app.use(`/foods`, foodRouter);
app.use(`/users`, userRouter);
app.use(`/orders`, orderRouter);

// const publicFolder = path.join(__dirname,'public');

// app.use(express.static(publicFolder));

// app.get('*', (req,res) => {
//   const indexFilePath = path.join(publicFolder,'index.html');
//   res.sendFile(indexFilePath);
// })
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listing on ${PORT}`);
});
