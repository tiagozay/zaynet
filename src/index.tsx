import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './styles/reset.css';
import './styles/style.css';
import CarrosselDeImagens from './components/CarrosselDeImagens';
import PaginaBaseComHeader from './pages/PaginaBaseComHeader';
import NotificacoesParaMobile from './pages/NotificacoesParaMobile';
import MensagensMobile from './pages/MensagensMobile';
import SolicitacoesDeAmizadeMobile from './pages/SolicitacoesDeAmizadeMobile';
import AdicionarAmigos from './pages/AdicionarAmigos';
import PesquisarPorUmaPessoaMobile from './pages/PesquisarPorUmaPessoaMobile';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PaginaBaseComHeader />}>
            <Route path='/' element={<Home />} />
            <Route path='/notificacoes' element={<NotificacoesParaMobile />} />
            <Route path='/mensagens' element={<MensagensMobile />} />
            <Route path='/solicitacoesDeAmizade' element={<SolicitacoesDeAmizadeMobile />} />
            <Route path='/adicionarAmigos' element={<AdicionarAmigos />} />
          </Route>
          <Route path='/image/:objInfoCarrosel' element={<CarrosselDeImagens />}/>
          <Route path='/pesquisar' element={<PesquisarPorUmaPessoaMobile />}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);