import React, { useContext } from 'react'
import './VideosPerfilUsuario.css';
import { MidiaPublicacaoModel } from '../../models/Publicacao/MidiaPublicacaoModel';
import { useNavigate } from 'react-router-dom';
import { PerfilUsuarioContext } from '../../contexts/PerfilUsuarioContext';
import { FeedContext } from '../../contexts/FeedContext';

export default function VideosPerfilUsuario() {

  const navigate = useNavigate();

  const { definePosicaoDoFeed } = useContext(FeedContext);

  const { videos } = useContext(PerfilUsuarioContext);

  function aoClicarEmUmVideo(indice: number) {

    const info = {
      midias: videos,
      indiceInicial: indice
    };

    definePosicaoDoFeed(window.scrollY)
      .then(() => { navigate('/image', { state: info }) });

  }

  return (
    <section id="videosPerfilDoUsuario__page">
      <h3 id="videosPerfilDoUsuario__titulo">Vídeos</h3>
      <ul id='videosPerfilDoUsuario__listaDeVideos'>

        {
          videos.map((video, index) => {

            return (
              <li className='videosPerfilDoUsuario__listaDeVideos__video' key={index} onClick={() => aoClicarEmUmVideo(index)}>
                <div className='videosPerfilDoUsuario__listaDeVideos__videoOverlay'>
                  <button className='material-symbols-outlined'>play_circle</button>
                </div>
                <img
                  src={`${process.env.REACT_APP_CAMINHO_MIDIA_PUBLICACAO_MINIATURA}${video.caminhoMidiaMiniatura}`}
                  alt="Vídeo usuário"
                />
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}
