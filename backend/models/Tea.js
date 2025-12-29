const mongoose = require('mongoose');
const TeaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  origin: { type: String },
  amount: { type: Number, default: 0 }
});
module.exports = mongoose.model('Tea', TeaSchema);