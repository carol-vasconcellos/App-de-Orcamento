import { Schema, model } from 'mongoose';

// Modelo de Orçamento
const BudgetSchema = new Schema({
  title: { type: String, required: true },
  customerName: { type: String, required: true },
  workerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  workerEmail: { type: String, required: true },
  materials: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
  }],
  totalCost: { type: Number, required: true },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Antes de salvar, calcular totalCost
BudgetSchema.pre('save', function(next) {
  this.totalCost = this.materials.reduce((acc, material) => {
    return acc + (material.quantity * material.unitPrice);
  }, 0);
  next();
});

export default model('Budget', BudgetSchema);
