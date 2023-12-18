import React from 'react';
import './Publicacao.css';
import UltimaImagemComSobreposicao from './UltimaImagemComSobreposicao';
import Comentarios from './Comentarios';
import InteracoesComAPublicacao from './InteracoesComAPublicacao';
import { useNavigate } from 'react-router-dom';
import { MidiaPublicacaoModel } from '../../models/MidiaPublicacaoModel';
import { ArquivosPublicacaoService } from '../../services/ArquivosPublicacaoService';

export default function Publicacao() {

  const navigate = useNavigate();

  const publicacao = {
    nomeAutor: "Pedro souza",
    perfil: "./imagensDinamicas/perfil.jpg",
    tempoDePublicacao: "10 h",
    texto: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, distinctio autem? Magnam autem quisquam voluptates eius cupiditate. Sapiente blanditiis obcaecati natus, similique, repellendus ipsum ipsam dicta eos consequatur, distinctio soluta?",
    midias: [
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub8.mp4',
        '/imagensDinamicas/publicacoes/miniaturasDasIamagens/pub8.jpg'
      ),
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub1.jpg',
        '/imagensDinamicas/publicacoes/miniaturasDasIamagens/pub1.jpg',
      ),
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub2.jpg',
        '/imagensDinamicas/publicacoes/miniaturasDasIamagens/pub2.jpg',
      ),
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub3.jpg',
        '/imagensDinamicas/publicacoes/miniaturasDasIamagens/pub3.jpg',
      ),
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub4.jpg',
        '/imagensDinamicas/publicacoes/miniaturasDasIamagens/pub4.jpg',
      ),
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub5.jpg',
        '/imagensDinamicas/publicacoes/miniaturasDasIamagens/pub5.jpg',
      ),
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub6.mp4',
        '/imagensDinamicas/publicacoes/miniaturasDasIamagens/pub6.jpg',
      ),
    ]
  }

  const classeDeCadaImagem = publicacao.midias.length === 1 ? "imagemOcupandoTodoTamanho" : "imagemOcupandoMetade";

  function aoClicarEmUmaImagem(indice: number) {
    const info = JSON.stringify(
      { imagensDoCarrossel: publicacao.midias, indiceImagemInicial: indice }
    );
    navigate(`/image/${encodeURIComponent(info)}`);
  }

  function aoClicarEmVerMaisImagens() {
    const info = JSON.stringify(
      { imagensDoCarrossel: publicacao.midias, indiceImagemInicial: 3 }
    );
    navigate(`/image/${encodeURIComponent(info)}`);
  }

  return (
    <div id='publicacao'>
      <div id='publicacao__infoUsuario'>
        <img src={publicacao.perfil} alt="Perfil usuário" id='publicacao__perfil' />
        <div>
          <p id='publicacao__nomeAutor'>Pedro souza</p>
          <p id='publicacao__tempoDePublicacao'>Há 10 h</p>
        </div>
      </div>

      <p id='publicacao__texto'>{publicacao.texto}</p>

      <div id='publicacao__imagens'>
        {
          publicacao.midias.slice(0, 4).map((midia, index) => {

            const imagemOuVideo = ArquivosPublicacaoService.identificaSeArquivoEImagemOuVideoPeloNome(midia.caminhoMidiaNormal)

            if (index === 3) {

              return <UltimaImagemComSobreposicao
                urlImagem={midia.caminhoMidiaNormal}
                key={midia.caminhoMidiaNormal}
                classeDeCadaImagem={classeDeCadaImagem}
                quantidadeDeImagensRestantes={publicacao.midias.slice(4).length}
                aoClicarEmVerTodasImagens={aoClicarEmVerMaisImagens}
              />

            } else {

              if (imagemOuVideo === 'Imagem') {
                return < img
                  key={midia.caminhoMidiaNormal}
                  src={midia.caminhoMidiaNormal}
                  alt="Imagem publicação"
                  id='publicacao_imagem'
                  className={classeDeCadaImagem}
                  onClick={() => aoClicarEmUmaImagem(index)}
                />
              }else{
                return <video
                  key={midia.caminhoMidiaNormal}
                  src={midia.caminhoMidiaNormal}
                  id='publicacao_imagem'
                  className={classeDeCadaImagem}
                  onClick={() => aoClicarEmUmaImagem(index)}
                ></video>
              }


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
