import React from 'react';
import './FotosUsuario.css';
import { useNavigate } from 'react-router-dom';

export default function FotosUsuario() {

  const navigate = useNavigate();

  //Mock das fotos do usuário logado que futuramente virão de outro lugar, como redux
  const fotosUsuario = [
    '/imagensDinamicas/publicacoes/pub1.jpg',
    '/imagensDinamicas/publicacoes/pub2.jpg',
    '/imagensDinamicas/publicacoes/pub3.jpg',
    '/imagensDinamicas/publicacoes/pub4.jpg',
    '/imagensDinamicas/publicacoes/pub5.jpg',
    '/imagensDinamicas/publicacoes/pub6.jpg',
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
                    src={fotoUsuario}
                    alt="Foto"
                    key={index}
                    onClick={ () => aoClicarEmUmaImagem(index)}
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
