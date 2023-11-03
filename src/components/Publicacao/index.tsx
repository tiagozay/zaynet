import React from 'react';
import './Publicacao.css';
import UltimaImagemComSobreposicao from './UltimaImagemComSobreposicao';
import Comentarios from './Comentarios';
import InteracoesComAPublicacao from './InteracoesComAPublicacao';
import { useNavigate } from 'react-router-dom';

export default function Publicacao() {

  const navigate = useNavigate();

  const publicacao = {
    nomeAutor: "Tiago zay",
    perfil: "./imagensDinamicas/perfil.jpg",
    tempoDePublicacao: "10 h",
    texto: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, distinctio autem? Magnam autem quisquam voluptates eius cupiditate. Sapiente blanditiis obcaecati natus, similique, repellendus ipsum ipsam dicta eos consequatur, distinctio soluta?",
    imagens: [
      '/imagensDinamicas/publicacoes/pub1.jpg',
      '/imagensDinamicas/publicacoes/pub2.jpg',
      '/imagensDinamicas/publicacoes/pub3.jpg',
      '/imagensDinamicas/publicacoes/pub4.jpg',
      '/imagensDinamicas/publicacoes/pub5.jpg',
      '/imagensDinamicas/publicacoes/pub6.jpg',
    ]
  }

  const classeDeCadaImagem = publicacao.imagens.length === 1 ? "imagemOcupandoTodoTamanho" : "imagemOcupandoMetade";

  function aoClicarEmUmaImagem(indice: number) {
    const info = JSON.stringify(
      {imagensDoCarrossel: publicacao.imagens, indiceImagemInicial: indice}
    );
    navigate(`/image/${ encodeURIComponent(info) }`);
  }

  function aoClicarEmVerMaisImagens() {
    const info = JSON.stringify(
      {imagensDoCarrossel: publicacao.imagens, indiceImagemInicial: 3}
    );
    navigate(`/image/${ encodeURIComponent(info) }`);
  }

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
          publicacao.imagens.slice(0, 4).map((imagem, index) => {

            if (index === 3) {

              return <UltimaImagemComSobreposicao
                urlImagem={imagem}
                key={imagem}
                classeDeCadaImagem={classeDeCadaImagem}
                quantidadeDeImagensRestantes={publicacao.imagens.slice(4).length}
                aoClicarEmVerTodasImagens={aoClicarEmVerMaisImagens}
              />

            } else {
              return < img
                key={imagem}
                src={imagem}
                alt="Imagem publicação"
                id='publicacao_imagem'
                className={classeDeCadaImagem}
                onClick={() => aoClicarEmUmaImagem(index)}
              />
            }

          }
          )
        }
      </div>

      <InteracoesComAPublicacao />
        
      <div id='publicacao__linhaDivisoria'></div>
      <Comentarios />
    </div>
  )
}
