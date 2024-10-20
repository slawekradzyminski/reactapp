import { Routes, Route } from 'react-router-dom';
import TipsPage from './components/tips/TipsPage';
import BooksPage from './components/books/BooksPage';
import HomePage from './components/home/HomePage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/tips/:tipId" element={<TipsPage />} />
        </Routes>
    );
}

export default AppRoutes;