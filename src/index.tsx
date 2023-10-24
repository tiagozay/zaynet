import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './styles/reset.css';
import './styles/style.css';
import CarrosselDeImagens from './components/CarrosselDeImagens';
import CarrosselDeImagensProvider from './contexts/CarrosselDeImagens';
import PaginaBaseComHeader from './pages/PaginaBaseComHeader';
import NotificacoesParaMobile from './pages/NotificacoesParaMobile';
import MensagensMobile from './pages/MensagensMobile';
import SolicitacoesDeAmizadeMobile from './pages/SolicitacoesDeAmizadeMobile';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>

    <CarrosselDeImagensProvider>
      <CarrosselDeImagens />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PaginaBaseComHeader />}>
            <Route path='/' element={<Home />} />
            <Route path='/notificacoes' element={<NotificacoesParaMobile />} />
            <Route path='/mensagens' element={<MensagensMobile />} />
            <Route path='/solicitacoesDeAmizade' element={<SolicitacoesDeAmizadeMobile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CarrosselDeImagensProvider>

  </React.StrictMode>
);