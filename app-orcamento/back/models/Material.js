import { Schema, model } from 'mongoose';

const MaterialSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});

const Material = model('Material', MaterialSchema);
export default Material;
