import React from 'react';
import './RestaurantList.css'; //  スタイルを適用するCSSファイルをインポート

/**
 * RestaurantList コンポーネント
 * 飲食店リストを表示し、クリックで詳細情報を取得できる
 * 
 * @param {Array} restaurants - レストラン情報の配列
 * @param {Function} onRestaurantClick - 店舗クリック時に実行される関数（店舗IDを引数に渡す）
 */
const RestaurantList = ({ restaurants, onRestaurantClick }) => {
  //  レストランリストが空の場合、メッセージを表示
  if (restaurants.length === 0) {
    return <p className="no-results">検索結果がありません。</p>;
  }

  return (
    <div className="restaurant-list-container"> {/*  リスト全体のコンテナ */}
      <div className="restaurant-list"> {/*  グリッドレイアウトで店舗を並べる */}
        {restaurants.map((shop) => (
          <div
            key={shop.id} //  各店舗に一意のキーを設定（Reactの最適化のため）
            onClick={() => onRestaurantClick(shop.id)} //  店舗がクリックされたら詳細を表示
            className="restaurant-card" // カードのスタイリング適用
          >
            <h2 className="restaurant-name">{shop.name}</h2> {/*  店舗名を表示 */}
            <p className="restaurant-access">{shop.access}</p> {/* アクセス情報を表示 */}
            
            {/*  画像が存在する場合のみ表示 */}
            {shop.photo && (
              <img
                src={shop.photo.mobile.s} //  店舗画像のURL
                alt={shop.name} // 画像のalt（スクリーンリーダー対応）
                className="restaurant-image" //  画像のスタイリング適用
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
