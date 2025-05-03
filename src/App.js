import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; // Замените Routes на Switch
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import Pagination from './components/Pagination';

function App() {
  const [allNews, setAllNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('ru');
  const [favorites, setFavorites] = useState([]);
  const NEWS_PER_PAGE = 6;
  const API_KEY = '7c306d51053439824bd52a894ba3558e';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = '';
        if (searchQuery) {
          url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=${language}&apikey=${API_KEY}`;
        } else {
          url = `https://gnews.io/api/v4/top-headlines?lang=${language}&country=ru&category=${category}&apikey=${API_KEY}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
          const featured = data.articles[0];
          const others = data.articles.slice(1);

          setAllNews([{ ...featured, index: 0 }, ...others.map((item, idx) => ({ ...item, index: idx + 1 }))]);
          setTotalPages(Math.ceil(others.length / NEWS_PER_PAGE));
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      }
    };

    fetchNews();
  }, [category, searchQuery, language]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const addToFavorites = (newsItem) => {
    const updatedFavorites = [...favorites, newsItem];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (index) => {
    const updatedFavorites = favorites.filter(item => item.index !== index);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/" className="logo">News</Link>
          <div className="filters">
            <div className="dropdown">
              <button className="dropdown-button">Категории ▼</button>
              <div className="dropdown-content">
                <button onClick={() => setCategory('general')}>Общие</button>
                <button onClick={() => setCategory('business')}>Бизнес</button>
                <button onClick={() => setCategory('technology')}>Технологии</button>
                <button onClick={() => setCategory('sports')}>Спорт</button>
                <button onClick={() => setCategory('entertainment')}>Развлечения</button>
              </div>
            </div>
            <div className="languages">
              <button onClick={() => setLanguage('ru')}>RU</button>
              <button onClick={() => setLanguage('en')}>EN</button>
            </div>
            <Link to="/favorites" className="favorites-link">Избранные</Link>
          </div>
        </header>
        <main>
          <Switch> {/* Замените Routes на Switch */}
            <Route
              exact
              path="/"
              render={() => (
                <>
                  <NewsList
                    featuredNews={allNews[0]}
                    otherNews={allNews.slice(1).slice(
                      (currentPage - 1) * NEWS_PER_PAGE,
                      currentPage * NEWS_PER_PAGE
                    )}
                    favorites={favorites}
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNext={handleNext}
                    onPrev={handlePrev}
                  />
                </>
              )}
            />
            <Route
              path="/news/:id"
              render={(props) => <NewsDetail {...props} allNews={allNews} />}
            />
            <Route
              path="/favorites"
              render={() => (
                <FavoritesList
                  favorites={favorites}
                  removeFromFavorites={removeFromFavorites}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

const FavoritesList = ({ favorites, removeFromFavorites }) => {
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
                <button onClick={() => removeFromFavorites(item.index)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;