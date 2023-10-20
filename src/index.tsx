import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './styles/reset.css';
import './styles/style.css';
import CarrosselDeImagens from './components/CarrosselDeImagens';
import CarrosselDeImagensProvider from './contexts/CarrosselDeImagens';
import PaginaBaseComHeader from './pages/PaginaBaseComHeader';
import Notificacoes from './pages/NotificacoesParaMobile';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>

    <CarrosselDeImagensProvider>
      <CarrosselDeImagens />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PaginaBaseComHeader />}>
            <Route path='/' element={<Home />} />
            <Route path='/notificacoes' element={<Notificacoes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CarrosselDeImagensProvider>

  </React.StrictMode>
);