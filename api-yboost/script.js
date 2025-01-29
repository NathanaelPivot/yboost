// const express = require("express");
// const mysql = require("mysql2");

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// const app = express();
// const PORT = 3000;

// app.use(express.json());

// const cors = require("cors");
// app.use(cors());

// require("dotenv").config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Erreur de connexion à la base de données:", err);
//     return;
//   }
//   console.log("Connecté à la base de données MySQL");
// });

// app.get("/ingredients/:id", (req, res) => {
//   const {id} = req.params
//   const query = `SELECT i.name FROM ingredients i JOIN cocktail_ingredients ci ON i.id = ci.ingredient_id  WHERE ci.cocktail_id=${id}`;
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Erreur lors de l'exécution de la requête:", err);
//       res.status(500).send("Erreur serveur");
//       return;
//     }
//     res.json(results);
//   });
// });

// app.get("/cocktails", (req, res) => {
//     const query = "SELECT * FROM cocktails";
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error("Erreur lors de l'exécution de la requête:", err);
//         res.status(500).send("Erreur serveur");
//         return;
//       }
//       res.json(results);
//     });
//   });

//   app.get("/cocktail/:id", (req, res) => {
//     const { id } = req.params; 
//     const query = `
//       SELECT c.id, c.name, c.prix, c.image
//       FROM cocktails c
//       WHERE c.id = ?
//     `;
  
//     db.query(query, [id], (err, results) => {
//       if (err) {
//         console.error("Erreur lors de la récupération du cocktail :", err);
//         res.status(500).json({ error: "Erreur serveur" });
//         return;
//       }
  
//       if (results.length === 0) {
//         res.status(404).json({ message: "Cocktail non trouvé" });
//         return;
//       }

//       res.json(results[0]);
//     });
//   });
  
// app.listen(PORT, () => {
//   console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
// });

// const JWT_SECRET = "cocktail";

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: "Veuillez fournir un username et un password" });
//   }

//   const query = "SELECT * FROM users WHERE username = ?";

//   db.query(query, [username], async (err, results) => {

//     if (err) {
//       console.error("Erreur lors de la recherche de l'utilisateur :", err);
//       return res.status(500).json({ error: "Erreur serveur" });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
//     }

//     const user = results[0];

//     // Vérification du mot de passe (hashé dans la base de données)
//     // const passwordMatch = await bcrypt.compare(password, user.password);
//     // if (!passwordMatch) {
//     //   console.log(password, user.password)
//     // }

//     if (password !== user.password){
//       return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
//     }

//     const token = jwt.sign(
//       { id: user.id, username: user.username },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ message: "Authentification réussie", token});
//   });
// });

// app.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: "Veuillez fournir un username et un password" });
//   }

//   try {
//     const userExistsQuery = "SELECT user_id FROM users WHERE username = ?";
//     db.query(userExistsQuery, [username], async (err, results) => {
//       if (err) {
//         console.error("Erreur lors de la vérification de l'utilisateur :", err);
//         return res.status(500).json({ error: "Erreur serveur" });
//       }

//       if (results.length > 0) {
//         return res.status(409).json({ error: "Nom d'utilisateur déjà pris" });
//       }

//       // const hashedPassword = await bcrypt.hash(password, 10);

//       const insertUserQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
//       db.query(insertUserQuery, [username, password], (err, results) => {
//         if (err) {
//           console.error("Erreur lors de l'insertion de l'utilisateur :", err);
//           return res.status(500).json({ error: "Erreur serveur" });
//         }

//         res.status(201).json({ message: "Compte créé avec succès" });
//       });
//     });
//   } catch (error) {
//     console.error("Erreur lors de la création du compte :", error);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });

// app.post('/cocktail', (req, res) => {
//   const { name, price, image, ingredients } = req.body;

//   if (!name || !price || !image || !ingredients || !Array.isArray(ingredients)) {
//     return res.status(400).json({ error: 'Données invalides' });
//   }

//   const insertCocktailQuery = 'INSERT INTO cocktails (name, prix, image) VALUES (?, ?, ?)';
//   const insertIngredientQuery = 'INSERT INTO cocktail_ingredients (cocktail_id, ingredient_id, quantite) VALUES (?, ?, ?)';
//   const findOrCreateIngredientQuery = 'INSERT INTO ingredients (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)';

//   db.beginTransaction((err) => {
//     if (err) {
//       console.error('Erreur de transaction:', err);
//       return res.status(500).json({ error: 'Erreur serveur' });
//     }

//     db.query(insertCocktailQuery, [name, price, image], (err, cocktailResult) => {
//       if (err) {
//         return db.rollback(() => {
//           console.error('Erreur lors de l\'ajout du cocktail:', err);
//           res.status(500).json({ error: 'Échec de l\'ajout du cocktail' });
//         });
//       }

//       const cocktailId = cocktailResult.insertId;

//       const ingredientPromises = ingredients.map((ingredient) => {
//         return new Promise((resolve, reject) => {
//           db.query(findOrCreateIngredientQuery, [ingredient.name], (err, ingredientResult) => {
//             if (err) return reject(err);

//             const ingredientId = ingredientResult.insertId;
//             db.query(insertIngredientQuery, [cocktailId, ingredientId, ingredient.quantity], (err) => {
//               if (err) return reject(err);
//               resolve();
//             });
//           });
//         });
//       });

//       Promise.all(ingredientPromises)
//         .then(() => {
//           db.commit((err) => {
//             if (err) {
//               return db.rollback(() => {
//                 console.error('Erreur de commit:', err);
//                 res.status(500).json({ error: 'Erreur serveur' });
//               });
//             }
//             res.status(201).json({ message: 'Cocktail ajouté avec succès' });
//           });
//         })
//         .catch((err) => {
//           db.rollback(() => {
//             console.error('Erreur lors de l\'ajout des ingrédients:', err);
//             res.status(500).json({ error: 'Erreur serveur' });
//           });
//         });
//     });
//   });
// });

