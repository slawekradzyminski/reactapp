import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import AppRoutes from './AppRoutes';
import { Container } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="xl">
        <AppRoutes />
      </Container>
    </BrowserRouter>
  );
}

export default App;