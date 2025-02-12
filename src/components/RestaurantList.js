import React from 'react';
import './RestaurantList.css'; // CSSファイルをインポート

const RestaurantList = ({ restaurants, onRestaurantClick }) => {
  // ✅ `restaurants` が配列でない場合のエラーハンドリング
  if (!Array.isArray(restaurants)) {
    console.error("restaurants is not an array:", restaurants);
    return <p className="error-message">データを取得できませんでした。</p>;
  }

  if (restaurants.length === 0) {
    return <p className="no-results">検索結果がありません。</p>;
  }

  return (
    <div className="restaurant-list-container">
      <div className="restaurant-list">
        {restaurants.map((shop) => (
          <div
            key={shop.id}
            onClick={() => onRestaurantClick(shop)} // ✅ `shop` 全体を渡す
            className="restaurant-card"
          >
            <h2 className="restaurant-name">{shop.name}</h2>
            <p className="restaurant-access">{shop.access}</p>
            
            {/* ✅ 画像が存在しない場合のデフォルト画像 */}
            <img
              src={shop.photo?.mobile?.s || "https://via.placeholder.com/150"}
              alt={shop.name}
              className="restaurant-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
