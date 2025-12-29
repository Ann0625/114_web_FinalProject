const Tea = require('../models/Tea');

// 新增茶葉
exports.createTea = async (req, res) => {
  try {
    const newTea = new Tea(req.body);
    const savedTea = await newTea.save();
    res.status(201).json(savedTea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 取得所有茶葉
exports.getTeas = async (req, res) => {
  try {
    const teas = await Tea.find();
    res.status(200).json(teas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};