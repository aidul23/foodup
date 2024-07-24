const { Router } = require("express");

const Food = require("../models/food.model");
const handler = require("express-async-handler");

const router = Router();

router.get(
  "/foods/",
  handler(async (req, res) => {
    const foods = await Food.find({});
    res.send(foods);
  })
);

router.get(
  "/foods/tags",
  handler(async (req, res) => {
    const tags = await Food.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await Food.countDocuments(),
    };

    tags.unshift(all);

    res.send(tags);
  })
);

router.get(
  "/foods/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i");

    const searchedFoods = await Food.find({ name: { $regex: searchRegex } });

    res.send(searchedFoods);
  })
);

router.get(
  "/foods/tag/:tag",
  handler(async (req, res) => {
    const { tag } = req.params;
    const taggedFood = await Food.find({ tags: tag });

    res.send(taggedFood);
  })
);

router.get(
  "/foods/:foodId",
  handler(async (req, res) => {
    const { foodId } = req.params;
    const food = await Food.findById(foodId);

    res.send(food);
  })
);

module.exports = router;
