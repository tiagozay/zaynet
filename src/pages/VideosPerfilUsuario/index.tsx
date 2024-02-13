import React from 'react'
import './VideosPerfilUsuario.css';
import { MidiaPublicacaoModel } from '../../models/Publicacao/MidiaPublicacaoModel';
import { useNavigate } from 'react-router-dom';

export default function VideosPerfilUsuario() {

  const navigate = useNavigate();

  const fotosUsuario = [
    new MidiaPublicacaoModel(1,
      '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub1.jpg',
      '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub1.jpg',
    ),
    new MidiaPublicacaoModel(2,
      '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub2.jpg',
      '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub2.jpg',
    ),
    new MidiaPublicacaoModel(3,
      '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub3.jpg',
      '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub3.jpg',
    ),
    new MidiaPublicacaoModel(4,
      '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub4.jpg',
      '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub4.jpg',
    ),
    new MidiaPublicacaoModel(5,
      '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub5.jpg',
      '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub5.jpg',
    ),
    new MidiaPublicacaoModel(6,
      '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub6.mp4',
      '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub6.jpg',
    )
  ];

  function aoClicarEmUmVideo(indice: number) {
    const info = JSON.stringify(
      { imagensDoCarrossel: fotosUsuario, indiceImagemInicial: indice }
    );
    navigate(`/image/${encodeURIComponent(info)}`);
  }

  return (
    <section id="videosPerfilDoUsuario__page">
      <h3 id="videosPerfilDoUsuario__titulo">Vídeos</h3>
      <ul id='videosPerfilDoUsuario__listaDeVideos'>

        {
          fotosUsuario.map((foto, index) => {

            return (
              <li className='videosPerfilDoUsuario__listaDeVideos__video' key={index} onClick={() => aoClicarEmUmVideo(index)}>
                <div className='videosPerfilDoUsuario__listaDeVideos__videoOverlay'>
                  <button className='material-symbols-outlined'>play_circle</button>
                </div>
                <img
                  src={foto.caminhoMidiaMiniatura}
                  alt="Foto usuário"
                />
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}
