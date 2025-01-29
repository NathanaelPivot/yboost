const express = require("express");
const { getIngredientsByCocktailId } = require("../controllers/ingredientController");

const router = express.Router();

router.get("/:id", getIngredientsByCocktailId);

module.exports = router;
