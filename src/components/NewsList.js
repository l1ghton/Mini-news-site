import React from 'react';
import { Link } from 'react-router-dom';

const NewsList = ({ featuredNews, otherNews, favorites, addToFavorites, removeFromFavorites }) => {
  return (
    <div>
      {featuredNews && (
        <div className="featured-news">
          <Link to={`/news/${featuredNews.index}`}>
            <img src={featuredNews.image} alt={featuredNews.title} />
            <div className="content-overlay">
              <h2>{featuredNews.title}</h2>
              <p>{featuredNews.description}</p>
            </div>
            <div className="important-label">Важная новость</div>
          </Link>
        </div>
      )}

      <div className="news-list">
        {otherNews.map((item) => (
          <div key={item.index} className="news-item">
            <Link to={`/news/${item.index}`}>
              <img src={item.image} alt={item.title} />
              <div className="news-item-content">
                <h3>{item.title}</h3>
                <p>{item.description || 'Нет описания'}</p>
                <button onClick={(e) => {
                  e.preventDefault();
                  if (favorites.some(fav => fav.index === item.index)) {
                    removeFromFavorites(item.index);
                  } else {
                    addToFavorites(item);
                  }
                }}>
                  {favorites.some(fav => fav.index === item.index) ? 'Удалить из избранного' : 'Добавить в избранное'}
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;