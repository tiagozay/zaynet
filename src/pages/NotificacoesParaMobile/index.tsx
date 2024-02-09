import React, { useContext, useEffect } from 'react';
import './NotificacoesParaMobile.css';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ControleLoginContext } from '../../contexts/ControleLoginContext';
import { LoginService } from '../../services/LoginService';


export default function NotificacoesParaMobile() {

  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

  const { permisaoParaIniciar, setPermisaoParaIniciar } = useContext(ControleLoginContext);

  useEffect(() => {
    LoginService.verificaSeHaLoginValido()
      .then(loginValido => {
        if (loginValido) {
          setPermisaoParaIniciar(true);
        } else {
          navigate('/login');
        }
      })
      .catch(() => { })
  }, [permisaoParaIniciar]);


  useEffect(() => {
    if (!isMobile) {
      navigate('/');
    }
  }, [isMobile]);

  return (
    permisaoParaIniciar &&
    <section id='notificacoesPage' className='espacamentosParaCompensarPartesDoHeader'>
      <h3 id='notificacoesMobile__titulo'>Notificações</h3>
      <ul id='notificacoesMobile__notificacoes'>
        <li className='notificacoesMobile__notificacao'>
          <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="notificacaoMobile__perfil" />
          <div id='notificacaoMobile__acao'>
            <p>
              <span id='notificacaoMobile__acao__autor'>Pedro souza </span>
              Adicionou uma nova foto.
            </p>
          </div>
        </li>
        <li className='notificacoesMobile__notificacao'>
          <img src="/imagensDinamicas/perfil2.jpg" alt="Foto de perfil" id="notificacaoMobile__perfil" />
          <div id='notificacaoMobile__acao'>
            <p>
              <span id='notificacaoMobile__acao__autor'>Maria almeida </span>
              Comentou em sua publicação.
            </p>
          </div>
        </li>
        <li className='notificacoesMobile__notificacao'>
          <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="notificacaoMobile__perfil" />
          <div id='notificacaoMobile__acao'>
            <p>
              <span id='notificacaoMobile__acao__autor'>Pedro souza </span>
              Adicionou uma nova foto.
            </p>
          </div>
        </li>
      </ul>
    </section>
  )
}
