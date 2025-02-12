import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const fetchRestaurants = async (lat, lng, keyword = '', range = 3) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants`, {
      params: { lat, lng, keyword, range }
    });
    return response.data;
  } catch (error) {
    console.error('API呼び出しエラー:', error.response ? error.response.data : error);
    return [];
  }
};

export const fetchRestaurantDetail = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurant/${id}`);
    return response.data;
  } catch (error) {
    console.error('詳細取得エラー:', error.response ? error.response.data : error);
    return null;
  }
};
