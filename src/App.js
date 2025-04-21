import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
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
  const [theme, setTheme] = useState('dark');
  const [favorites, setFavorites] = useState([]);
  const NEWS_PER_PAGE = 6;
  const API_KEY = process.env.REACT_APP_API_KEY;

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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  };

  const notify = (title, body) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body });
        }
      });
    }
  };

  useEffect(() => {
    if (allNews.length > 0) {
      notify(allNews[0].title, allNews[0].description);
    }
  }, [allNews]);

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
          <h1>Последние Новости</h1>
          <div className="search">
            <input
              type="text"
              placeholder="Поиск новостей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => setSearchQuery('')}>Найти</button>
          </div>
          <div className="filters">
            <button onClick={() => setCategory('general')}>Общие</button>
            <button onClick={() => setCategory('business')}>Бизнес</button>
            <button onClick={() => setCategory('technology')}>Технологии</button>
            <button onClick={() => setCategory('sports')}>Спорт</button>
            <button onClick={() => setCategory('entertainment')}>Развлечения</button>
          </div>
          <div>
            <button onClick={() => setLanguage('ru')}>RU</button>
            <button onClick={() => setLanguage('en')}>EN</button>
          </div>
          <button onClick={toggleTheme}>Переключить тему</button>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
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
              }
            />
            <Route path="/news/:id" element={<NewsDetail allNews={allNews} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;