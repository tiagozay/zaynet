import React, { memo, useContext, useEffect, useState } from 'react';
import './Publicacao.css';
import UltimaImagemComSobreposicao from './UltimaImagemComSobreposicao';
import Comentarios from './Comentarios';
import InteracoesComAPublicacao from './InteracoesComAPublicacao';
import { useNavigate } from 'react-router-dom';
import { MidiaPublicacaoModel } from '../../models/Publicacao/MidiaPublicacaoModel';
import { ArquivosPublicacaoService } from '../../services/ArquivosPublicacaoService';
import ModalEditarPublicacao from '../ModalEditarPublicacao';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import ModalCompartilharPublicacao from '../ModalCompartilharPublicacao';
import MenuOpcoesPublicacao from '../MenuOpcoesPublicacao';
import UsuarioService from '../../services/UsuarioService';
import { PublicacaoModel } from '../../models/Publicacao/PublicacaoModel';
import { APIService } from '../../services/APIService';
import { PublicacaoService } from '../../services/PublicacaoService';
import { FeedContext } from '../../contexts/FeedContext';
import { CompartilharPublicacaoContext } from '../../contexts/CompartilharPublicacaoContext';
import { PublicacaoCompartilhadaModel } from '../../models/Publicacao/PublicacaoCompartilhadaModel';

interface PublicacaoProps {
  publicacao: PublicacaoModel,
  compartilharPublicacao?: (publicacao: PublicacaoModel) => void,
  editarPublicacao?: (publicacao: PublicacaoModel | PublicacaoCompartilhadaModel) => void,
  publicacaoCompartilhada?: boolean
}

function Publicacao({ publicacao, compartilharPublicacao, editarPublicacao, publicacaoCompartilhada }: PublicacaoProps) {
  //Mock provisório que indica se a publicacao atual é do autor que está logado. Futuramente para obter esse dado deverá ser feita uma verificação com dados vindos do redux ou algo semelhante
  const indicadorPublicacaoDoUsuarioLogado = true;

  const navigate = useNavigate();

  const { definePosicaoDoFeed } = useContext(FeedContext);

  const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

  const [quantidadeDeComentarios, setQuantidadeDeComentarios] = useState(
    publicacao.comentarios ? publicacao.comentarios.length : 0
  );
  const [quantidadeDeCurtidas, setQuantidadeDeCurtidas] = useState(
    publicacao.curtidas ? publicacao.curtidas.length : 0
  );
  const [quantidadeDeCompartilhamentos, setQuantidadeDeCompartilhamentos] = useState(
    publicacao instanceof PublicacaoModel ? publicacao.quantidadeDeCompartilhamentos : 0
  );

  const classeDeCadaImagem = publicacao.midiasPublicacao?.length === 1 ? "imagemOcupandoTodoTamanho" : "imagemOcupandoMetade";

  function aoClicarEmUmaImagem(indice: number) {
    const info = JSON.stringify(
      { imagensDoCarrossel: publicacao.midiasPublicacao, indiceImagemInicial: indice }
    );
    definePosicaoDoFeed(window.scrollY)
      .then(() => { navigate(`/image/${encodeURIComponent(info)}`) })
  }

  function aoClicarEmVerMaisImagens() {
    const info = JSON.stringify(
      { imagensDoCarrossel: publicacao.midiasPublicacao, indiceImagemInicial: 3 }
    );
    definePosicaoDoFeed(window.scrollY)
      .then(() => { navigate(`/image/${encodeURIComponent(info)}`) })
  }

  function clickCompartilharPublicacao() 
  {
    if(compartilharPublicacao){
      compartilharPublicacao(publicacao);
    }

  }

  return (
    <>
   
      <div id='publicacao' className={publicacaoCompartilhada ? 'publicacaoSemMargem' : ''}>
        <div id='publicacao__infoUsuario'>
          <div id='publicacao__infoUsuarioContainer'>
            <img src={`${process.env.REACT_APP_CAMINHO_IMAGEM_PERFIL_MINIATURA}${publicacao.autor.nomeMiniaturaFotoPerfil}`} alt="Perfil usuário" id='publicacao__perfil' />
            <div id='publicacao__infoUsuarioContainer__divInfo'>
              <p id='publicacao__nomeAutor'>{`${publicacao.autor.nome} ${publicacao.autor.sobrenome}`}</p>
              <p id='publicacao__tempoDePublicacao'>{publicacao.dataDePublicacao}</p>
            </div>
          </div>
          {
            indicadorPublicacaoDoUsuarioLogado && !publicacaoCompartilhada ?
              <MenuOpcoesPublicacao
                publicacao={publicacao}
                clickEditarPublicacao={editarPublicacao}
                clickExluirPublicacao={() => { }}
              />
              :
              ""
          }
        </div>

        <p id='publicacao__texto'>{publicacao.texto}</p>

        {
          publicacao.midiasPublicacao && publicacao.midiasPublicacao.length !== 0 ?
            <div id='publicacao__imagens'>
              {
                publicacao.midiasPublicacao.slice(0, 4).map((midia, index) => {

                  const imagemOuVideo = ArquivosPublicacaoService.identificaSeArquivoEImagemOuVideoPeloNome(midia.caminhoMidiaNormal)

                  if (index === 3) {

                    return <UltimaImagemComSobreposicao
                      urlImagem={imagemOuVideo === "Imagem" ? midia.caminhoMidiaNormal : midia.caminhoMidiaMiniatura}
                      key={midia.caminhoMidiaNormal}
                      classeDeCadaImagem={classeDeCadaImagem}
                      quantidadeDeImagensRestantes={publicacao.midiasPublicacao ? publicacao.midiasPublicacao.slice(4).length : 0}
                      aoClicarEmVerTodasImagens={aoClicarEmVerMaisImagens}
                    />

                  } else {

                    if (imagemOuVideo === 'Imagem') {
                      return < img
                        key={midia.caminhoMidiaNormal}
                        src={`${process.env.REACT_APP_CAMINHO_MIDIA_PUBLICACAO}${midia.caminhoMidiaNormal}`}
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
                          src={`${process.env.REACT_APP_CAMINHO_MIDIA_PUBLICACAO_MINIATURA}${midia.caminhoMidiaMiniatura}`}
                          className={`publicacao_imagem ${classeDeCadaImagem}`}
                        />
                      </div>
                    }
                  }
                }
                )
              }
            </div> : ""
        }

        {
          !publicacaoCompartilhada ?
            <>
              <InteracoesComAPublicacao
                publicacao={publicacao}
                quantidadeDeComentarios={quantidadeDeComentarios}
                quantidadeDeCurtidas={quantidadeDeCurtidas}
                quantidadeDeCompartilhamentos={quantidadeDeCompartilhamentos}
                setQuantidadeDeCurtidas={setQuantidadeDeCurtidas}
                compartilharPublicacao={clickCompartilharPublicacao}
              />

              <div id='publicacao__linhaDivisoria'></div>
              <Comentarios
                comentariosPublicacao={publicacao.comentarios}
                setQuantidadeDeComentarios={setQuantidadeDeComentarios}
                idPublicacao={publicacao.id}
              />
            </> :
            ""
        }
      </div>
    </>

  )
}

export default memo(Publicacao);