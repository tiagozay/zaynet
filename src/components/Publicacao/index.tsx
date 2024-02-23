import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import './Publicacao.css';
import UltimaImagemComSobreposicao from './UltimaImagemComSobreposicao';
import Comentarios from './Comentarios';
import InteracoesComAPublicacao from './InteracoesComAPublicacao';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArquivosPublicacaoService } from '../../services/ArquivosPublicacaoService';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import MenuOpcoesPublicacao from '../MenuOpcoesPublicacao';
import { PublicacaoModel } from '../../models/Publicacao/PublicacaoModel';
import { FeedContext } from '../../contexts/FeedContext';
import { PublicacaoCompartilhadaModel } from '../../models/Publicacao/PublicacaoCompartilhadaModel';
import UsuarioService from '../../services/UsuarioService';

interface PublicacaoProps {
  publicacao: PublicacaoModel,
  compartilharPublicacao?: (publicacao: PublicacaoModel) => void,
  editarPublicacao?: (publicacao: PublicacaoModel | PublicacaoCompartilhadaModel) => void,
  publicacaoCompartilhada?: boolean
}

function Publicacao({ publicacao, compartilharPublicacao, editarPublicacao, publicacaoCompartilhada }: PublicacaoProps) {

  const navigate = useNavigate();

  const location = useLocation();

  const { definePosicaoDoFeed } = useContext(FeedContext);

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

  const indicadorPublicacaoDoUsuarioLogado = publicacao.autor.id === UsuarioService.obtemIdUsuarioLogado();

  const botaoComentarRef = useRef(null);

  function aoClicarEmUmaImagem(indice: number) {
    const info = {
      midias: publicacao.midiasPublicacao,
      indiceInicial: indice
    };

    definePosicaoDoFeed(window.scrollY)
      .then(() => { navigate('/image', { state: info }) });
  }

  function aoClicarEmVerMaisImagens() {
    const info = {
      midias: publicacao.midiasPublicacao,
      indiceInicial: 3
    };

    definePosicaoDoFeed(window.scrollY)
      .then(() => { navigate('/image', { state: info }) });
  }

  function clickCompartilharPublicacao() {
    if (compartilharPublicacao) {
      compartilharPublicacao(publicacao);
    }

  }

  function clickComentarPublicacao() {
    const btnComentar = botaoComentarRef.current as any;
    btnComentar.focus();
  }

  function clickPerfilDoUsuario() {
    //Antes de re-direcionar, verifica se já não está nesse perfil. Se sim, não faz nada.
    if (location.pathname !== `/perfil/${publicacao.autor.id}`) {
      navigate(`/perfil/${publicacao.autor.id}`);
    }
  }

  return (
    <>

      <div id='publicacao' className={publicacaoCompartilhada ? 'publicacaoSemMargem' : ''}>
        <div id='publicacao__infoUsuario'>
          <div id='publicacao__infoUsuarioContainer'>
            <img
              src={UsuarioService.obtemCaminhoCompletoDoPerfilMiniaturaDoUsuarioRecebido(publicacao.autor)}
              alt="Perfil usuário" id='publicacao__perfil'
              onClick={clickPerfilDoUsuario}
            />
            <div id='publicacao__infoUsuarioContainer__divInfo'>
              <p id='publicacao__nomeAutor' onClick={clickPerfilDoUsuario}>{`${publicacao.autor.nome} ${publicacao.autor.sobrenome}`}</p>
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

                  if (index === 3 && publicacao.midiasPublicacao.length > 4) {

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
                comentarPublicacao={clickComentarPublicacao}
              />

              <div id='publicacao__linhaDivisoria'></div>
              <Comentarios
                idAutorPublicacao={publicacao.autor.id}
                comentariosPublicacao={publicacao.comentarios}
                setQuantidadeDeComentarios={setQuantidadeDeComentarios}
                idPublicacao={publicacao.id}
                btnComentarRef={botaoComentarRef}
              />
            </> :
            ""
        }
      </div>
    </>

  )
}

export default memo(Publicacao);