// src/components/RestaurantList.js

import React from 'react';
import './RestaurantList.css'; // CSSファイルをインポート

const RestaurantList = ({ restaurants, onRestaurantClick }) => {
  if (restaurants.length === 0) {
    return <p className="no-results">検索結果がありません。</p>;
  }

  return (
    <div className="restaurant-list-container">
      <div className="restaurant-list">
        {restaurants.map((shop) => (
          <div
            key={shop.id}
            onClick={() => onRestaurantClick(shop.id)}
            className="restaurant-card"
          >
            <h2 className="restaurant-name">{shop.name}</h2>
            <p className="restaurant-access">{shop.access}</p>
            {shop.photo && (
              <img
                src={shop.photo.mobile.s}
                alt={shop.name}
                className="restaurant-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
