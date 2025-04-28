import express from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import budgetRouter from './routes/budgetRoutes.js';
import materialRouter from './routes/materialRoutes.js'; // <-- IMPORTANTE

config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:8081', // Certo para dev local
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// ATENÇÃO: Você esqueceu de colocar isso! Para o Express entender JSON:
app.use(express.json());

// Conectar ao MongoDB
connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado!'))
  .catch((error) => console.error('Erro ao conectar MongoDB:', error));

// Suas rotas
app.use('/budgets', budgetRouter);
app.use('/materials', materialRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
