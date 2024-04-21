import { Routes, Route, Navigate } from 'react-router-dom';
import TipsComponent from './components/TipsComponent';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/tips" element={<TipsComponent />} />
            <Route path="" element={<Navigate replace to="/tips/1" />} />
            <Route path="/" element={<Navigate replace to="/tips/1" />} />
            <Route path="/reactapp" element={<Navigate replace to="/tips/1" />} />
            <Route path="/tips/:tipId" element={<TipsComponent />} />
        </Routes>
    );
}

export default AppRoutes;