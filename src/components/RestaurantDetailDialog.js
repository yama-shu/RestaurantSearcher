import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { fetchRestaurantDetail } from '../services/hotpepperApi';

const RestaurantDetailDialog = ({ id, onClose }) => {
  const [restaurant, setRestaurant] = useState(null); // 店舗の詳細情報を格納するステート

  useEffect(() => {
    const getRestaurantDetail = async () => {
      try {
        const data = await fetchRestaurantDetail(id); // APIから店舗の詳細データを取得
        console.log('取得したデータ:', data); // デバッグ用のログ
        setRestaurant(data);
      } catch (error) {
        console.error('詳細情報の取得に失敗しました:', error);
      }
    };

    if (id) {
      getRestaurantDetail();
    }
  }, [id]);

  if (!restaurant) return null;

  return (
    <Dialog open={!!id} onClose={onClose} fullWidth maxWidth="sm">
      {/* ダイアログヘッダー */}
      <DialogTitle sx={{ backgroundColor: '#f0f8ff' }}>
        {restaurant.name} {/* 店舗名 */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* ダイアログのコンテンツ部分 */}
      <DialogContent dividers sx={{ backgroundColor: '#fafafa' }}>
        <p><strong>キャッチコピー:</strong> {restaurant.catch || '情報なし'}</p> {/* キャッチコピー */}
        <p><strong>住所:</strong> {restaurant.address}</p> {/* 住所 */}
        <p><strong>営業時間:</strong> {restaurant.open}</p> {/* 営業時間 */}
        <p><strong>平均予算:</strong> {restaurant.budget?.average || '情報なし'}</p> {/* 平均予算 */}
        <p><strong>席数:</strong> {restaurant.capacity ? `${restaurant.capacity}席` : '情報なし'}</p> {/* 席数 */}
        <p><strong>パーティー最大収容人数:</strong> {restaurant.party_capacity ? `${restaurant.party_capacity}人` : '情報なし'}</p> {/* パーティー収容人数 */}
        <p><strong>Wi-Fi:</strong> {restaurant.wifi === 'あり' ? '利用可能' : '利用不可'}</p> {/* Wi-Fi情報 */}

        {/* 電話番号の追加（複数のパターンに対応） */}
        {(restaurant.tel || restaurant.tel_display || restaurant.phone) && (
          <p>
            <strong>電話番号:</strong>{' '}
            <a href={`tel:${restaurant.tel || restaurant.tel_display || restaurant.phone}`}>
              {restaurant.tel || restaurant.tel_display || restaurant.phone}
            </a>
          </p>
        )}

        {/* 店舗の公式URLを表示 */}
        {restaurant.urls?.pc && (
          <p>
            <strong>店舗URL:</strong>{' '}
            <a href={restaurant.urls.pc} target="_blank" rel="noopener noreferrer">
              こちらをクリック
            </a>
          </p>
        )}

        {/* 高解像度の店舗画像を表示 */}
        {restaurant.photo?.pc?.l && (
          <img
            src={restaurant.photo.pc.l}
            alt={restaurant.name}
            style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantDetailDialog;