import React, { useContext } from 'react';
import './FotosPerfilUsuario.css';
import { MidiaPublicacaoModel } from '../../models/Publicacao/MidiaPublicacaoModel';
import { useNavigate } from 'react-router-dom';
import { PerfilUsuarioContext } from '../../contexts/PerfilUsuarioContext';
import { FeedContext } from '../../contexts/FeedContext';

export default function FotosPerfilUsuario() {

  const navigate = useNavigate();

  const { definePosicaoDoFeed } = useContext(FeedContext);

  const {imagens} = useContext(PerfilUsuarioContext);

  function aoClicarEmUmaImagem(indice: number) {

    const info = {
      midias: imagens,
      indiceInicial: indice
    };

    definePosicaoDoFeed(window.scrollY)
      .then(() => { navigate('/image', { state: info }) });

  }

  return (
    <section id="fotosPerfilDoUsuario__page">
      <h3 id="fotosPerfilDoUsuario__titulo">Fotos</h3>
      <ul id='fotosPerfilDoUsuario__listaDeFotos'>
        {
          imagens.map((foto, index) => {
            return (
              <li className='fotosPerfilDoUsuario__listaDeFotos__foto' key={index}>
                <img 
                  src={`${process.env.REACT_APP_CAMINHO_MIDIA_PUBLICACAO_MINIATURA}${foto.caminhoMidiaMiniatura}`}
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
