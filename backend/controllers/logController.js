const BrewingLog = require('../models/BrewingLog');

// 新增日誌
exports.createLog = async (req, res) => {
  try {
    const newLog = new BrewingLog(req.body);
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 取得所有日誌 (包含關聯的茶葉資訊)
exports.getLogs = async (req, res) => {
  try {
    const logs = await BrewingLog.find().populate('teaId', 'name type');
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 刪除日誌
exports.deleteLog = async (req, res) => {
  try {
    await BrewingLog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: '日誌已刪除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};