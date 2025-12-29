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
// 更新茶葉資料
exports.updateTea = async (req, res) => {
  try {
    const updatedTea = await Tea.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // 回傳更新後的資料
    );
    if (!updatedTea) return res.status(404).json({ message: '找不到該茶葉' });
    res.status(200).json(updatedTea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 刪除茶葉
exports.deleteTea = async (req, res) => {
  try {
    const tea = await Tea.findByIdAndDelete(req.params.id);
    if (!tea) return res.status(404).json({ message: '找不到該茶葉' });
    res.status(200).json({ message: '茶葉已刪除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};