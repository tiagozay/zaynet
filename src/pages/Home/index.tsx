import React from 'react';
import Header from '../../components/Header';
import MenuEsquerdo from '../../components/MenuEsquerdo';
import Publicacao from '../../components/Publicacao';
import './home.css';

export default function Home() {
  return (
    <>
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
            />
          </div>
          <button id='feed_adicionarUmaNovaPublicacao__btnFotoEVideo'>
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
