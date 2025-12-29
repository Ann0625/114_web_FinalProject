const mongoose = require('mongoose');

const BrewingLogSchema = new mongoose.Schema({
  // 關聯到 Tea 模型，這樣我們才知道這則日誌是哪種茶
  teaId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tea', 
    required: true 
  },
  waterTemp: { type: Number }, // 水溫
  // 雷達圖的五個維度數據 (1-5 分)
  flavorData: {
    sweet: { type: Number, default: 3 },
    bitter: { type: Number, default: 3 },
    aroma: { type: Number, default: 3 },
    aftertaste: { type: Number, default: 3 },
    strength: { type: Number, default: 3 }
  },
  note: { type: String }, // 品茗心得
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BrewingLog', BrewingLogSchema);