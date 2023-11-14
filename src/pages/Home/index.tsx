import React, { useState } from 'react';
import Header from '../../components/Header';
import MenuEsquerdo from '../../components/MenuEsquerdo';
import Publicacao from '../../components/Publicacao';
import './home.css';
import ModalPublicar from '../../components/ModalPublicar';

export default function Home() {

  const [modalPublicarAberto, setModalPublicarAberto] = useState(false);

  function fecharModalPublicar()
  {
    setModalPublicarAberto(false);
  }

  function abrirModalPublicar()
  {
    setModalPublicarAberto(true);
  }

  return (
    <>

      <ModalPublicar modalAberto={modalPublicarAberto} fecharModal={fecharModalPublicar} />

      <section id='feed'>

        <div id='feed_adicionarUmaNovaPublicacao'>
          <div id='feed_adicionarUmaNovaPublicacao__container'>
            <img
              src="./imagensDinamicas/perfil.jpg"
              alt="Foto perfil"
              id='feed_adicionarUmaNovaPublicacao__perfil'
            />
            <input
              type="text"
              id='feed_adicionarUmaNovaPublicacao__input'
              placeholder='No que você está pensando, Tiago?'
              onClick={abrirModalPublicar}
              disabled={ modalPublicarAberto ? true : false}
            />
          </div>
          <button id='feed_adicionarUmaNovaPublicacao__btnFotoEVideo' onClick={abrirModalPublicar}>
            <img src="./icones/imagemIcone.png" alt="" />
            Foto/vídeo
          </button>
        </div>

        <Publicacao></Publicacao>
        <Publicacao></Publicacao>
      </section>
    </>
  )
}
