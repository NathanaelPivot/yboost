const express = require("express");
const {
  getAllCocktails,
  getCocktailById,
  createCocktail,
} = require("../controllers/cocktailController");

const router = express.Router();

router.get("/", getAllCocktails);
router.get("/:id", getCocktailById);
router.post("/", createCocktail);

module.exports = router;
