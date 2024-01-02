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
import FotosUsuario from './pages/FotosUsuario';
import PublicarMobile from './pages/PublicarMobile';
import PerfilUsuario from './pages/PerfilUsuario';
import FeedPublicacoesUsuario from './pages/FeedPublicacoesUsuario';
import FotosPerfilUsuario from './pages/FotosPerfilUsuario';
import VideosPerfilUsuario from './pages/VideosPerfilUsuario';
import AmigosPerfilUsuario from './pages/AmigosPerfilUsuario';
import LoginOuCadastro from './pages/LoginOuCadastro';
import CadastrarUsuarioMobilePrimeiraFase from './pages/CadastrarUsuarioMobilePrimeiraFase';
import CadastrarUsuarioMobileSegundaFase from './pages/CadastrarUsuarioMobileSegundaFase';
import CadastroUsuarioProvider from './contexts/CadastroUsuarioContext';
import EditarPublicacaoMobile from './pages/EditarPublicacaoMobile';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='login' element={
          <CadastroUsuarioProvider>
            <LoginOuCadastro />
          </CadastroUsuarioProvider>
        } />
        <Route path='cadastrarUsuarioMobilePrimeiraFase' element={
          <CadastroUsuarioProvider>
            <CadastrarUsuarioMobilePrimeiraFase />
          </CadastroUsuarioProvider>

        } />
        <Route path='cadastrarUsuarioMobileSegundaFase' element={
          <CadastroUsuarioProvider>
            <CadastrarUsuarioMobileSegundaFase />
          </CadastroUsuarioProvider>
        } />

      <Route path='/' element={<PaginaBaseComHeader />}>
        <Route path='/' element={<Home />} />
        <Route path='/notificacoes' element={<NotificacoesParaMobile />} />
        <Route path='/mensagens' element={<MensagensMobile />} />
        <Route path='/solicitacoesDeAmizade' element={<SolicitacoesDeAmizadeMobile />} />
        <Route path='/adicionarAmigos' element={<AdicionarAmigos />} />
        <Route path='/fotos' element={<FotosUsuario />} />
      </Route>
      <Route path='/image/:objInfoCarrosel' element={<CarrosselDeImagens />} />
      <Route path='/pesquisar' element={<PesquisarPorUmaPessoaMobile />} />
      <Route path='/publicar' element={<PublicarMobile />} />
      <Route path='/editarPublicacao' element={<EditarPublicacaoMobile />} />
      <Route path='/perfil' element={<PerfilUsuario />}>
        <Route path='/perfil' element={<FeedPublicacoesUsuario />} />
        <Route path='fotos' element={<FotosPerfilUsuario />} />
        <Route path='videos' element={<VideosPerfilUsuario />} />
        <Route path='amigos' element={<AmigosPerfilUsuario />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode >
);