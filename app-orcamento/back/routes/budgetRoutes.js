import express from 'express';
import Budget from '../models/Budget.js'; // Lembre-se de adicionar .js na extensão do arquivo
const router = express.Router();

// Listar todos os orçamentos
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Buscar orçamento por ID
router.get('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: 'Orçamento não encontrado' });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar novo orçamento
router.post('/', async (req, res) => {
  const { title, customerName, workerName, customerEmail, workerEmail, materials, deadline } = req.body;

  if (!title || !customerName || !workerName || !customerEmail || !workerEmail || !materials || !deadline) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const budget = new Budget({
      title,
      customerName,
      workerName,
      customerEmail,
      workerEmail,
      materials,
      deadline
    });

    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;  // Alteração aqui: Use a exportação padrão
