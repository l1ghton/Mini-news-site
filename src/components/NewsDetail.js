import React from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import ru from 'date-fns/locale/ru';

const timeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { locale: ru, addSuffix: true });
};

const NewsDetail = ({ allNews }) => {
  const { id } = useParams();
  const newsItem = allNews.find(news => news.index === parseInt(id));

  if (!newsItem) return <div>Новость не найдена</div>;

  return (
    <div className="news-detail">
      <h2>{newsItem.title}</h2>
      <img src={newsItem.image} alt={newsItem.title} />
      <p><strong>Описание:</strong> {newsItem.description}</p>
      <p><strong>Полный текст:</strong> {newsItem.content || 'Нет полного текста'}</p>
      <p><strong>Дата публикации:</strong> {timeAgo(newsItem.publishedAt)}</p>
      <p><strong>Источник:</strong> <a href={newsItem.url} target="_blank" rel="noopener noreferrer">{newsItem.source.name}</a></p>
    </div>
  );
};

export default NewsDetail;