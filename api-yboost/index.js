const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const cocktailRoutes = require("./routes/cocktail");
const ingredientRoutes = require("./routes/ingredient");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/cocktails", cocktailRoutes);
app.use("/ingredients", ingredientRoutes);

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
