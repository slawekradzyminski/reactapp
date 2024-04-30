import { Routes, Route, Navigate } from 'react-router-dom';
import TipsComponent from './components/tips/TipsComponent';
import BooksDisplay from './components/books/BooksDisplay';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/tips" element={<TipsComponent />} />
            <Route path="/books" element={<BooksDisplay />} />
            <Route path="" element={<Navigate replace to="/tips/1" />} />
            <Route path="/" element={<Navigate replace to="/tips/1" />} />
            <Route path="/tips/:tipId" element={<TipsComponent />} />
        </Routes>
    );
}

export default AppRoutes;