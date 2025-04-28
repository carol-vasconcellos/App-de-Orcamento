import { Router } from 'express';
import Material from '../models/Material.js'; // Corrigido o import
const router = Router();

// Criar material
router.post('/', async (req, res) => {
  try {
    const { name, quantity, unitPrice } = req.body;
    const material = new Material({ name, quantity, unitPrice });
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    console.error('Erro ao criar material:', error);
    res.status(500).json({ error: 'Erro ao criar material' });
  }
});

// Listar materiais
router.get('/', async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (error) {
    console.error('Erro ao buscar materiais:', error);
    res.status(500).json({ error: 'Erro ao buscar materiais' });
  }
});

export default router;
