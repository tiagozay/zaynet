import React, { useEffect, useState } from 'react';
import './Publicacao.css';
import UltimaImagemComSobreposicao from './UltimaImagemComSobreposicao';
import Comentarios from './Comentarios';
import InteracoesComAPublicacao from './InteracoesComAPublicacao';
import { useNavigate } from 'react-router-dom';
import { MidiaPublicacaoModel } from '../../models/MidiaPublicacaoModel';
import { ArquivosPublicacaoService } from '../../services/ArquivosPublicacaoService';
import ModalEditarPublicacao from '../ModalEditarPublicacao';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import ModalCompartilharPublicacao from '../ModalCompartilharPublicacao';

interface PublicacaoProps {
  publicacaoCompartilhada?: boolean
}

export default function Publicacao({ publicacaoCompartilhada }: PublicacaoProps) {

  //Mock provisório que indica se a publicacao atual é do autor que está logado. Futuramente para obter esse dado deverá ser feita uma verificação com dados vindos do redux ou algo semelhante
  const indicadorPublicacaoDoUsuarioLogado = true;

  const publicacao = {
    nomeAutor: "Pedro souza",
    perfil: "./imagensDinamicas/perfil.jpg",
    tempoDePublicacao: "10 h",
    texto: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, distinctio autem? Magnam autem quisquam voluptates eius cupiditate. Sapiente blanditiis obcaecati natus, similique, repellendus ipsum ipsam dicta eos consequatur, distinctio soluta?",
    midias: [
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub1.jpg',
        '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub1.jpg',
      ),
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub2.jpg',
        '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub2.jpg',
      ),
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub3.jpg',
        '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub3.jpg',
      ),
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub4.jpg',
        '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub4.jpg',
      ),
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub5.jpg',
        '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub5.jpg',
      ),
      new MidiaPublicacaoModel(
        '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub6.mp4',
        '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub6.jpg',
      ),
    ]
  }

  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

  const [indicadorModalEditarPublicacaoAberto, setIndicadorModalEditarPublicacaoAberto] = useState(false);
  const [indicadorModalCompartilharPublicacaoAberto, setIndicadorModalCompartilharPublicacaoAberto] = useState(false);

  const classeDeCadaImagem = publicacao.midias.length === 1 ? "imagemOcupandoTodoTamanho" : "imagemOcupandoMetade";

  useEffect(() => {
    if (indicadorModalEditarPublicacaoAberto) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [indicadorModalEditarPublicacaoAberto]);

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

  function abrirModalEditarPublicacao() {
    if (isMobile) {
      navigate('/editarPublicacao');
    } else {
      setIndicadorModalEditarPublicacaoAberto(true);
    }
  }

  function fehcarModalEditarPublicacao() {
    setIndicadorModalEditarPublicacaoAberto(false);
  }

  function abrirModalCompartilharPublicacao() {
    if (isMobile) {
      navigate('/editarPublicacao');
    } else {
      setIndicadorModalCompartilharPublicacaoAberto(true);
    }
  }

  function fehcarModalCompartilharPublicacao() {
    setIndicadorModalCompartilharPublicacaoAberto(false);
  }


  return (
    <>
      {
        indicadorModalEditarPublicacaoAberto ?
          <ModalEditarPublicacao
            fecharModal={fehcarModalEditarPublicacao}
            modalAberto={indicadorModalEditarPublicacaoAberto}
          /> :
          ""
      }
      {
        indicadorModalCompartilharPublicacaoAberto ?
          <ModalCompartilharPublicacao
            fecharModal={fehcarModalCompartilharPublicacao}
            modalAberto={indicadorModalCompartilharPublicacaoAberto}
          /> :
          ""
      }
      <div id='publicacao' className={publicacaoCompartilhada ? 'publicacaoSemMargem' : ''}>
        <div id='publicacao__infoUsuario'>
          <div id='publicacao__infoUsuarioContainer'>
            <img src={publicacao.perfil} alt="Perfil usuário" id='publicacao__perfil' />
            <div id='publicacao__infoUsuarioContainer__divInfo'>
              <p id='publicacao__nomeAutor'>Pedro souza</p>
              <p id='publicacao__tempoDePublicacao'>Há 10 h</p>
            </div>
          </div>
          {
            indicadorPublicacaoDoUsuarioLogado && !publicacaoCompartilhada ?
              <button
                className='material-symbols-outlined'
                id='publicacao__btnEditarPublicacao'
                onClick={abrirModalEditarPublicacao}
              >edit</button> :
              ""
          }

        </div>

        <p id='publicacao__texto'>{publicacao.texto}</p>

        <div id='publicacao__imagens'>
          {
            publicacao.midias.slice(0, 4).map((midia, index) => {

              const imagemOuVideo = ArquivosPublicacaoService.identificaSeArquivoEImagemOuVideoPeloNome(midia.caminhoMidiaNormal)

              if (index === 3) {

                return <UltimaImagemComSobreposicao
                  urlImagem={imagemOuVideo === "Imagem" ? midia.caminhoMidiaNormal : midia.caminhoMidiaMiniatura}
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
                    className={`publicacao_imagem ${classeDeCadaImagem}`}
                    onClick={() => aoClicarEmUmaImagem(index)}
                  />
                } else {
                  return <div
                    id='publicacao__divMiniaturaVideo'
                    className={`publicacao_imagem ${classeDeCadaImagem}`}
                    onClick={() => aoClicarEmUmaImagem(index)}
                    key={midia.caminhoMidiaMiniatura}
                  >

                    <div id='publicacao__divMiniaturaVideo__overlay'>
                      <i className='material-symbols-outlined'>play_arrow</i>
                    </div>

                    <img
                      src={midia.caminhoMidiaMiniatura}
                      className={`publicacao_imagem ${classeDeCadaImagem}`}
                    />
                  </div>
                }
              }
            }
            )
          }
        </div>

        {
          !publicacaoCompartilhada ?
            <>
              <InteracoesComAPublicacao compartilharPublicacao={abrirModalCompartilharPublicacao}/>

              <div id='publicacao__linhaDivisoria'></div>
              <Comentarios />
            </> :
            ""
        }
      </div>
    </>

  )
}
