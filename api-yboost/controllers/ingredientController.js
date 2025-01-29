const db = require("../config/database");

const getIngredientsByCocktailId = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT i.name 
    FROM ingredients i 
    JOIN cocktail_ingredients ci ON i.id = ci.ingredient_id 
    WHERE ci.cocktail_id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des ingrédients:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    res.json(results);
  });
};

module.exports = { getIngredientsByCocktailId };
