import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function NewsItem({ news }) {
  return (
    <motion.div
      className="news-item"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <img src={news.image} alt={news.title} />
      <div className="news-item-content">
        <h3>{news.title}</h3>
        <p>{news.date}</p>
        <Link to={`/news/${news.id}`}>Подробнее</Link>
      </div>
    </motion.div>
  );
}

export default NewsItem;