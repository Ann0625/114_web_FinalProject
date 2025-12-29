const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const teaRoutes = require('./routes/teaRoutes');
app.use('/api/teas', teaRoutes);
app.get('/test', (req, res) => res.send('伺服器本體正常！'));
// 1. 資料庫連線
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB Connected to Docker!'))
  .catch(err => console.error(' Connection error:', err));

// 測試路由
app.get('/', (req, res) => res.send('TeaRadar API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server on port ${PORT}`));