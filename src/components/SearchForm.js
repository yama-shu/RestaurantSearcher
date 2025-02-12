import './SearchForm.css';
import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  // ユーザーが入力するキーワード（例: ラーメン、カフェ）
  const [keyword, setKeyword] = useState('');
  
  // 検索半径の初期値を1km（APIのrange=3相当）に設定
  const [radius, setRadius] = useState(1);

  // 位置情報を取得し、検索を実行する関数
  const handleSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // 取得した緯度・経度、キーワード、検索半径を onSearch 関数に渡す
        onSearch(latitude, longitude, keyword, radius);
      },
      (error) => {
        console.error('位置情報取得エラー:', error); // 位置情報が取得できない場合のエラーハンドリング
      }
    );
  };

  return (
    <div className="search-form-container">
      <h2 className="search-form-title">レストラン検索</h2>

      {/* キーワード入力欄 */}
      <label className="search-label">キーワード</label>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="例: ラーメン, カフェ"
        className="search-input"
      />

      {/* 検索範囲の選択（Hot Pepper API の range 設定に対応） */}
      <label className="search-label">検索半径</label>
      <select
        value={radius}
        onChange={(e) => setRadius(Number(e.target.value))} // 数値型に変換
        className="search-select"
      >
        <option value={0.3}>300m</option>
        <option value={0.5}>500m</option>
        <option value={1}>1km</option>
        <option value={2}>2km</option>
        <option value={3}>3km</option>
      </select>

      {/* 検索実行ボタン */}
      <button onClick={handleSearch} className="search-button">
        近くのレストランを検索
      </button>
    </div>
  );
};

export default SearchForm;