import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import RestaurantList from './components/RestaurantList';
import RestaurantDetailDialog from './components/RestaurantDetailDialog'; // ✅ ダイアログ用のコンポーネントをインポート
import { fetchRestaurants } from './services/hotpepperApi';
import './components/App.css'; // ✅ スタイルを適用

function App() {
  const [restaurants, setRestaurants] = useState([]); // ✅ 検索結果のレストランリストを管理
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null); // ✅ 選択したレストランのIDを管理

  // ✅ 位置情報を基にレストランを検索する
  const handleSearch = async (lat, lng, keyword, radius) => {
    const range = convertRadiusToRange(radius); // 検索半径をAPIの範囲コードに変換
    const data = await fetchRestaurants(lat, lng, keyword, range); // APIからレストラン情報を取得
    setRestaurants(data); // 取得したデータをステートに保存
  };

  // ✅ 検索半径（km）をHot Pepper APIの range パラメータに変換
  const convertRadiusToRange = (radius) => {
    if (radius <= 0.3) return 1; // 300m
    if (radius <= 0.5) return 2; // 500m
    if (radius <= 1) return 3;   // 1000m
    if (radius <= 2) return 4;   // 2000m
    return 5;                   // 3000m
  };

  // ✅ ユーザーがレストランをクリックしたときに詳細を表示するための処理
  const handleRestaurantClick = (id) => {
    setSelectedRestaurantId(id); // クリックされたレストランのIDを設定
  };

  // ✅ レストラン詳細ダイアログを閉じる処理
  const handleCloseDetail = () => {
    setSelectedRestaurantId(null); // 選択中のレストランをリセット
  };

  return (
    <div className="app-container">
      {/* ✅ アプリのタイトル */}
      <h1 className="app-title">レストラン検索アプリ</h1>

      {/* ✅ 検索フォーム（位置情報とキーワードでレストランを検索） */}
      <SearchForm onSearch={handleSearch} />

      {/* ✅ 検索結果のレストランリストを表示 */}
      <RestaurantList restaurants={restaurants} onRestaurantClick={handleRestaurantClick} />

      {/* ✅ 選択したレストランの詳細を表示（ダイアログ形式） */}
      {selectedRestaurantId && (
        <RestaurantDetailDialog id={selectedRestaurantId} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;