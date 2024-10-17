import { Routes, Route } from 'react-router-dom';
import TipsComponent from './components/tips/TipsComponent';
import BooksDisplay from './components/books/BooksDisplay';
import HomePage from './components/home/HomePage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/tips" element={<TipsComponent />} />
            <Route path="/books" element={<BooksDisplay />} />
            <Route path="" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/tips/:tipId" element={<TipsComponent />} />
        </Routes>
    );
}

export default AppRoutes;