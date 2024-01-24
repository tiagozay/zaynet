import React from 'react';
import './FotosUsuario.css';
import { useNavigate } from 'react-router-dom';
import { MidiaPublicacaoModel } from '../../models/MidiaPublicacaoModel';

export default function FotosUsuario() {

  const navigate = useNavigate();

  //Mock das fotos do usuário logado que futuramente virão de outro lugar, como redux
  const fotosUsuario = [
    new MidiaPublicacaoModel(null,
      '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub1.jpg',
      '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub1.jpg',
    ),
    new MidiaPublicacaoModel(null,
      '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub2.jpg',
      '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub2.jpg',
    ),
    new MidiaPublicacaoModel(null,
      '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub3.jpg',
      '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub3.jpg',
    ),
    new MidiaPublicacaoModel(null,
      '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub4.jpg',
      '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub4.jpg',
    ),
    new MidiaPublicacaoModel(null,
      '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub5.jpg',
      '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub5.jpg',
    ),
    new MidiaPublicacaoModel(null,
      '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub6.mp4',
      '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub6.jpg',
    )
  ];

  function aoClicarEmUmaImagem(indice: number) {
    const info = JSON.stringify(
      { imagensDoCarrossel: fotosUsuario, indiceImagemInicial: indice }
    );
    navigate(`/image/${encodeURIComponent(info)}`);
  }

  return (
    <section id='fotosUsuarioPage'>
      <div id='fotosUsuarioPage__container'>
        <h3 id='fotosUsuarioPage__titulo'>Fotos</h3>
        <ul id='fotosUsuarioPage__listaDeFotos'>

          {
            fotosUsuario.map((fotoUsuario, index) => {
              return (
                <li id='fotosUsuarioPage__foto'>
                  <img
                    src={fotoUsuario.caminhoMidiaMiniatura}
                    alt="Foto"
                    key={index}
                    onClick={() => aoClicarEmUmaImagem(index)}
                  />
                </li>
              )
            })
          }


        </ul>
      </div>
    </section>
  )
}
