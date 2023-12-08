import React from 'react';
import './NotificacoesParaMobile.css';


export default function NotificacoesParaMobile() {
  return (
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
              Comentou 'Suka' em sua publicação.
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
