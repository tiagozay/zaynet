import React from 'react';
import './FotosPerfilUsuario.css';
import { MidiaPublicacaoModel } from '../../models/Publicacao/MidiaPublicacaoModel';
import { useNavigate } from 'react-router-dom';

export default function FotosPerfilUsuario() {

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
    <section id="fotosPerfilDoUsuario__page">
      <h3 id="fotosPerfilDoUsuario__titulo">Fotos</h3>
      <ul id='fotosPerfilDoUsuario__listaDeFotos'>

        {
          fotosUsuario.map((foto, index) => {
            return (
              <li className='fotosPerfilDoUsuario__listaDeFotos__foto' key={index}>
                <img 
                  src={foto.caminhoMidiaMiniatura}
                  alt="Foto usuário"
                  onClick={() => aoClicarEmUmaImagem(index)}
                />
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}
