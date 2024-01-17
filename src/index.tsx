import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/style.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
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
import CaixaDeMensagem from './components/CaixaDeMensagem';
import CaixaDeMensagemProvider from './contexts/CaixaDeMensagemContext';
import CaixaDeMensagensMobile from './pages/CaixaDeMensagensMobile';
import EditarPublicacaoCompartilhadaMobile from './pages/EditarPublicacaoCompartilhadaMobile';
import CompartilharPublicacaoMobile from './pages/CompartilharPublicacaoMobile';
import EditarPerfilMobile from './pages/EditarPerfilMobile';
import ConfiguracoesContaMobile from './pages/ConfiguracoesContaMobile';


const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <CaixaDeMensagemProvider>
      <CaixaDeMensagem />

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

          <Route path='/conversa' element={<CaixaDeMensagensMobile />} />

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
          <Route path='/compartilharPublicacao' element={<CompartilharPublicacaoMobile />} />
          <Route path='/editarPublicacao' element={<EditarPublicacaoMobile />} />
          <Route path='/editarPublicacaoCompartilhada' element={<EditarPublicacaoCompartilhadaMobile />} />
          <Route path='/editarPerfil' element={<EditarPerfilMobile />} />
          <Route path='/configuracoesConta' element={<ConfiguracoesContaMobile />} />
          <Route path='/perfil' element={<PerfilUsuario />}>
            <Route path='/perfil' element={<FeedPublicacoesUsuario />} />
            <Route path='fotos' element={<FotosPerfilUsuario />} />
            <Route path='videos' element={<VideosPerfilUsuario />} />
            <Route path='amigos' element={<AmigosPerfilUsuario />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CaixaDeMensagemProvider>
  </React.StrictMode >
);