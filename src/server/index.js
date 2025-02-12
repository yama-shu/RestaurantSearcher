const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // ✅ 環境変数を読み込む

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY; // ✅ .env からAPIキーを取得

// レストラン情報取得
app.get('/api/restaurants', async (req, res) => {
  const { lat, lng, keyword, range } = req.query;

  try {
    const response = await axios.get('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
      params: {
        key: API_KEY,
        lat,
        lng,
        keyword,
        range,
        format: 'json'
      }
    });
    res.json(response.data.results.shop);
  } catch (error) {
    console.error('API呼び出しエラー:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// 店舗詳細取得
app.get('/api/restaurant/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
      params: {
        key: API_KEY,
        id: id,
        format: 'json'
      }
    });
    res.json(response.data.results.shop[0]);
  } catch (error) {
    console.error('詳細取得エラー:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 サーバーが http://localhost:${PORT} で起動しました`);
});