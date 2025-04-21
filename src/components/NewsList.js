import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NewsList = ({ featuredNews, otherNews, favorites, addToFavorites, removeFromFavorites }) => {
  return (
    <div>
      {featuredNews && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="featured-news"
        >
          <h2>Важная новость</h2>
          <Link to={`/news/${featuredNews.index}`}>
            <img src={featuredNews.image} alt={featuredNews.title} />
            <h3>{featuredNews.title}</h3>
            <p>{featuredNews.description}</p>
          </Link>
        </motion.div>
      )}

      <div className="news-list">
        {otherNews.map((item) => (
          <motion.div
            key={item.index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="news-item"
          >
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;