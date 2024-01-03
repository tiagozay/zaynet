import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import MenuEsquerdo from '../../components/MenuEsquerdo';
import Publicacao from '../../components/Publicacao';
import './home.css';
import ModalPublicar from '../../components/ModalPublicar';
import { useNavigate } from 'react-router-dom';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';

export default function Home() {

  const [modalPublicarAberto, setModalPublicarAberto] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (modalPublicarAberto) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [modalPublicarAberto]);

  function fecharModalPublicar() {
    setModalPublicarAberto(false);
  }

  function abrirModalPublicar() {
    const larguraDaTela = window.innerWidth;
    if (larguraDaTela <= TAMANHO_DE_TELA_MOBILE) {
      navigate('/publicar');
    } else {
      setModalPublicarAberto(true);
    }

  }

  return (
    <>

      {
        modalPublicarAberto ?
          <ModalPublicar
            modalAberto={modalPublicarAberto}
            fecharModal={fecharModalPublicar}
          /> :
          ""
      }


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
              placeholder='No que você está pensando, Pedro?'
              onClick={abrirModalPublicar}
              disabled={modalPublicarAberto ? true : false}
            />
          </div>
          <button id='feed_adicionarUmaNovaPublicacao__btnFotoEVideo' onClick={abrirModalPublicar}>
            <img src="./icones/imagemIcone.png" alt="" />
            Foto/vídeo
          </button>
        </div>

        <Publicacao />
        <Publicacao />
      </section>
    </>
  )
}
