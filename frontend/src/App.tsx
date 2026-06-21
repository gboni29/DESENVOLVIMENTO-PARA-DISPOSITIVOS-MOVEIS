import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FilmeDetalhesPage from './pages/FilmeDetalhesPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import WatchlistPage from './pages/WatchlistPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/filmes/:id" element={<FilmeDetalhesPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
