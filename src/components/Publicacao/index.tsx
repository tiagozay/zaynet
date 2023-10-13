import React from 'react';
import './Publicacao.css';

export default function Publicacao() {

  const publicacao = {
    nomeAutor: "Tiago zay",
    perfil: "./imagensDinamicas/perfil.jpg",
    tempoDePublicacao: "10 h",
    texto: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, distinctio autem? Magnam autem quisquam voluptates eius cupiditate. Sapiente blanditiis obcaecati natus, similique, repellendus ipsum ipsam dicta eos consequatur, distinctio soluta?",
    imagens: [
      './imagensDinamicas/publicacoes/pub1.jpg',
      './imagensDinamicas/publicacoes/pub2.jpg',
      './imagensDinamicas/publicacoes/pub2.jpg',
      './imagensDinamicas/publicacoes/pub1.jpg',
    ]
  }

  const classeDeCadaImagem = publicacao.imagens.length === 1 ? "imagemOcupandoTodoTamanho" : "imagemOcupandoMetade";

  return (
    <div id='publicacao'>
      <div id='publicacao__infoUsuario'>
        <img src={publicacao.perfil} alt="Perfil usuário" id='publicacao__perfil' />
        <div>
          <p id='publicacao__nomeAutor'>Tiago zay</p>
          <p id='publicacao__tempoDePublicacao'>Há 10 h</p>
        </div>
      </div>

      <p id='publicacao__texto'>{publicacao.texto}</p>

      <div id='publicacao__imagens'>
        {
          publicacao.imagens.map((imagem, index) => {

            if (index === 3) {

              const style = {
                backgroundImage: `url(${imagem})`,
                backgroundPosition: 'center',
                backgroundSize: '100%'
              }

              return <div 
                id='publicacao__imagens__sobreposicaoDaUltimaImagem' 
                className={classeDeCadaImagem}
                style={style}
              >
                <div>
                  
                </div>
              </div>

            } else {
              return < img
                src={`${imagem}`}
                alt="Imagem publicação"
                id='publicacao_imagem'
                className={classeDeCadaImagem}
              />
            }

          }
          )
        }
      </div>

    </div>
  )
}
