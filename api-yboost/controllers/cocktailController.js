const db = require("../config/database");

const getAllCocktails = (req, res) => {
  const query = "SELECT * FROM cocktails";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
};

const getCocktailById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM cocktails WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erreur serveur :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Cocktail non trouvé" });
    }

    res.json(results[0]);
  });
};

const createCocktail = (req, res) => {
  const { name, price, image, ingredients } = req.body;

  if (!name || !price || !image || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "Données invalides" });
  }

  const insertCocktailQuery = "INSERT INTO cocktails (name, prix, image) VALUES (?, ?, ?)";
  const findIngredientQuery = "SELECT id FROM ingredients WHERE name = ?";
  const insertIngredientQuery = "INSERT INTO ingredients (name) VALUES (?)";
  const insertCocktailIngredientQuery = "INSERT INTO cocktail_ingredients (cocktail_id, ingredient_id, quantite) VALUES (?, ?, ?)";

  db.beginTransaction((err) => {
    if (err) {
      console.error("Erreur lors du début de la transaction:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    // Étape 1 : Insérer le cocktail
    db.query(insertCocktailQuery, [name, price, image], (err, result) => {
      if (err) {
        console.error("Erreur lors de l'ajout du cocktail:", err);
        return db.rollback(() => res.status(500).json({ error: "Erreur lors de l'ajout du cocktail" }));
      }

      const cocktailId = result.insertId;
      console.log(`Cocktail inséré avec l'ID: ${cocktailId}`);

      // Étape 2 : Ajouter les ingrédients et faire la liaison
      const ingredientPromises = ingredients.map((ingredient) => {
        return new Promise((resolve, reject) => {
          db.query(findIngredientQuery, [ingredient.name], (err, results) => {
            if (err) return reject(err);

            if (results.length > 0) {
              // L'ingrédient existe déjà
              const ingredientId = results[0].id;
              console.log(`Ingrédient existant trouvé : ${ingredient.name} (ID: ${ingredientId})`);
              db.query(insertCocktailIngredientQuery, [cocktailId, ingredientId, ingredient.quantity || 1], (err) => {
                if (err) return reject(err);
                resolve();
              });
            } else {
              // L'ingrédient n'existe pas, on l'insère
              db.query(insertIngredientQuery, [ingredient.name], (err, result) => {
                if (err) return reject(err);

                const ingredientId = result.insertId;
                console.log(`Nouvel ingrédient inséré : ${ingredient.name} (ID: ${ingredientId})`);

                db.query(insertCocktailIngredientQuery, [cocktailId, ingredientId, ingredient.quantity || 1], (err) => {
                  if (err) return reject(err);
                  resolve();
                });
              });
            }
          });
        });
      });

      // Étape 3 : Commit si tout est bon
      Promise.all(ingredientPromises)
        .then(() => {
          db.commit((err) => {
            if (err) {
              console.error("Erreur lors du commit:", err);
              return db.rollback(() => res.status(500).json({ error: "Erreur lors de la validation de la transaction" }));
            }
            res.status(201).json({ message: "Cocktail ajouté avec succès", cocktailId });
          });
        })
        .catch((err) => {
          console.error("Erreur lors de l'ajout des ingrédients:", err);
          db.rollback(() => res.status(500).json({ error: "Erreur lors de l'ajout des ingrédients" }));
        });
    });
  });
};


module.exports = { getAllCocktails, getCocktailById, createCocktail };
