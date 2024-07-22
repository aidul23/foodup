const mongoose = require("mongoose");
const User = require("../models/user.model");
const Food = require("../models/food.model");

const { sample_foods, sample_users } = require("../data");

const bcrypt = require("bcrypt");

mongoose.set("strictQuery", true);

// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }

const dbconnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    //await seedUsers();
    //await seedFoods();
    console.log("connect successfully---");
  } catch (error) {
    console.log(error);
  }
};

async function seedUsers() {
  const userCount = User.countDocuments();
  if (userCount > 0) {
    console.log("User seed is alreay done!");
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, 10);
    await User.create(user);
  }
  console.log("Users seed is done!");
}

async function seedFoods() {
  const foodCount = Food.countDocuments();
  if (foodCount > 0) {
    console.log("Food seed is alreay done!");
    return;
  }

  for (let food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`;
    await Food.create(food);
  }
  console.log("Foods seed is done!");
}

module.exports = { dbconnect };
