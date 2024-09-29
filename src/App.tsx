import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import AppRoutes from './AppRoutes';
import { Container } from '@mui/material';
import Footer from './components/footer/Footer';

function App() {
  return (
    <BrowserRouter basename="/">
      <Header />
      <Container maxWidth="xl">
        <AppRoutes />
        <Footer/>
      </Container>
    </BrowserRouter>
  );
}

export default App;