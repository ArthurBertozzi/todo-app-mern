// backend/server.js
require("dotenv").config(); // Carregar variáveis de ambiente do arquivo .env
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const taskRouter = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect(`${MONGODB_URI}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Erro na conexão com o MongoDB:"));
db.once("open", () => console.log("Conectado ao MongoDB"));

// Roteamento
app.use("/tasks", taskRouter);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
