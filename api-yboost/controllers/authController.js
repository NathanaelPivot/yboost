const db = require("../config/database");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "cocktail";

const login = (req, res) => {

    console.log("okok ca log")
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Veuillez fournir un username et un password" });
  }

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Erreur lors de la recherche de l'utilisateur :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length === 0 || password !== results[0].password) {
      return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
    }

    const user = results[0];
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Authentification réussie", token });
  });
};

const register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Veuillez fournir un username et un password" });
  }

  const userExistsQuery = "SELECT id FROM users WHERE username = ?";
  const insertUserQuery = "INSERT INTO users (username, password) VALUES (?, ?)";

  db.query(userExistsQuery, [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });

    if (results.length > 0) {
      return res.status(409).json({ error: "Nom d'utilisateur déjà pris" });
    }

    db.query(insertUserQuery, [username, password], (err) => {
      if (err) return res.status(500).json({ error: "Erreur serveur" });

      res.status(201).json({ message: "Compte créé avec succès" });
    });
  });
};

module.exports = { login, register };
    