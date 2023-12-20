// backend/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("./models/Task");
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

const seedData = [
  {
    title: "Fazer compras",
    description: "Comprar itens essenciais no mercado",
    checklist: [
      { action: "Verificar a lista de compras", isDone: false },
      { action: "Ir ao supermercado", isDone: false },
    ],
  },
  {
    title: "Estudar Node.js",
    description: "Aprender Node.js para desenvolvimento backend",
    checklist: [
      { action: "Ler documentação do Node.js", isDone: false },
      { action: "Fazer exercícios práticos", isDone: false },
    ],
  },
  {
    title: "Fazer exercícios",
    description: "Realizar exercícios físicos por 30 minutos",
    checklist: [
      { action: "Aquecimento", isDone: false },
      { action: "Cardio", isDone: false },
      { action: "Treino de força", isDone: false },
    ],
  },
];

async function seedDatabase() {
  await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    for (const taskData of seedData) {
      const task = new Task(taskData);
      await task.save();
    }

    console.log("Dados populados com sucesso!");
  } catch (error) {
    console.error("Erro ao popular dados:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
