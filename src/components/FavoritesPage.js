import React from 'react';
import { Link } from 'react-router-dom';

const FavoritesPage = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favorites-page">
      <h2>Избранные новости</h2>
      {favorites.length === 0 ? (
        <p>У вас нет избранных новостей.</p>
      ) : (
        <div className="news-list">
          {favorites.map((item) => (
            <div key={item.index} className="news-item">
              <img src={item.image} alt={item.title} />
              <div className="news-item-content">
                <h3>{item.title}</h3>
                <p>{item.description || 'Нет описания'}</p>
                <div className="actions">
                  <Link to={`/news/${item.index}`} className="view-button">
                    Подробнее
                  </Link>
                  <button onClick={() => removeFromFavorites(item.index)} className="remove-button">
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;