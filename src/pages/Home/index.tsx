import React, { useContext, useEffect, useState } from 'react';
import Publicacao from '../../components/Publicacao';
import './home.css';
import ModalPublicar from '../../components/ModalPublicar';
import { useNavigate } from 'react-router-dom';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import PublicacaoCompartilhada from '../../components/PublicacaoCompartilhada';
import UsuarioService from '../../services/UsuarioService';
import { APIService } from '../../services/APIService';
import { PublicacaoFactory } from '../../services/PublicacaoFactory';
import { PublicacaoModel } from '../../models/Publicacao/PublicacaoModel';
import { PublicacaoCompartilhadaModel } from '../../models/Publicacao/PublicacaoCompartilhadaModel';
import { FeedContext } from '../../contexts/FeedContext';
import ModalCompartilharPublicacao from '../../components/ModalCompartilharPublicacao';
import { useMediaQuery } from 'react-responsive';
import { CompartilharPublicacaoContext } from '../../contexts/CompartilharPublicacaoContext';
import ModalEditarPublicacao from '../../components/ModalEditarPublicacao';
import { EditarPublicacaoContext } from '../../contexts/EditarPublicacaoContext';
import { PublicarContext } from '../../contexts/PublicarContext';
import Toast from '../../components/Toast';

export default function Home() {

  const {indicadorModalPublicarAberto, setIndicadorModalPublicarAberto} =  useContext(PublicarContext);

  const {
    indicadorModalCompartilharPublicacaoAberto,
    setIndicadorModalCompartilharPublicacaoAberto,
    publicacaoCompartilhada,
    setPublicacaoCompartilhada
  } = useContext(CompartilharPublicacaoContext);

  const {
    indicadorModalEditarPublicacaoAberto,
    setIndicadorModalEditarPublicacaoAberto,
    publicacaoEditada,
    setPublicacaoEditada
  } = useContext(EditarPublicacaoContext);

  const [mensagemToast, setMensagemToast] = useState<string | null>(null);

  const [publicacoes, setPublicacoes] = useState<Array<PublicacaoModel | PublicacaoCompartilhadaModel>>([]);

  const navigate = useNavigate();

  const { posicaoFeed, definePosicaoDoFeed } = useContext(FeedContext);

  const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

  useEffect(() => {
    if (indicadorModalPublicarAberto || indicadorModalCompartilharPublicacaoAberto || indicadorModalEditarPublicacaoAberto) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [indicadorModalPublicarAberto, indicadorModalCompartilharPublicacaoAberto, indicadorModalEditarPublicacaoAberto]);

  useEffect(() => {
    //Toda vez que cair nesta página Home ou mudar o state de publicacoes, buscará a posição do feed que está armazenada no contexto. Esta posição é gravada toda vez que nevegamos desta página home para outra, aí quando volta para cá, já se sabe a posição anterior e retorna para ela (este armazenamento é feito nas publicações, pois é nelas que ocorrem essas mudanças, como ao abrir carrossel de imagens, clicar em compartilhar(para mobile), clicar em editar (para mobile))
    window.scrollTo(0, posicaoFeed);
  }, [publicacoes])

  useEffect(() => {
    APIService.get('publicacoes')
      .then(res => {

        if (!res.data) {
          return;
        }

        const objetosPublicacoes = res.data;

        const publicacoesMapeadas = objetosPublicacoes.map((objetoPublicacao: any) => {

          return PublicacaoFactory.create(objetoPublicacao);

        });

        setPublicacoes(publicacoesMapeadas);


      })
      .catch(() => { });
  }, []);

  function abrirToast(mensagem: string)
  {
    setMensagemToast(mensagem);
  }

  function fecharToast()
  {
    setMensagemToast(null);
  }

  function fecharModalPublicar() {
    setIndicadorModalPublicarAberto(false);
  }

  function abrirModalPublicar() {
    if (isMobile) {
      navigate('/publicar');
    } else {
      setIndicadorModalPublicarAberto(true);
    }
  }

  function aoPublicar(publicacao: object){
    setMensagemToast("Publicação criada com sucesso!");
    adicionaNovaPublicacaoAoEstado(publicacao);
  }

  function abrirCompartilhamento(publicacao: PublicacaoModel) {

    setPublicacaoCompartilhada(publicacao);

    if (isMobile) {
      definePosicaoDoFeed(window.scrollY)
        .then(() => {
          navigate('/compartilharPublicacao');
        })
    } else {
      setIndicadorModalCompartilharPublicacaoAberto(true);
    }
  }

  function fecharCompartilhamento() {
    setIndicadorModalCompartilharPublicacaoAberto(false);
    setPublicacaoCompartilhada(null);
  }

  function aoCompartilhar() {
    setMensagemToast("Publicação compartilhada com sucesso!");
    setPublicacaoCompartilhada(null);
  }

  function abrirEdicaoPublicacao(publicacao: PublicacaoModel | PublicacaoCompartilhadaModel) {
    setPublicacaoEditada(publicacao);
    if (isMobile) {
      definePosicaoDoFeed(window.scrollY)
        .then(() => {
          navigate('/editarPublicacao');
        })
    } else {
      definePosicaoDoFeed(window.scrollY)
        .then(() => {
          setIndicadorModalEditarPublicacaoAberto(true);
        })
    }
  }

  function fehcarModalEditarPublicacao() {
    setIndicadorModalEditarPublicacaoAberto(false);
    setPublicacaoEditada(null);
  }

  function aoEditar(publicacaoEditada: any){
    setMensagemToast("Publicação editada com sucesso!");

    setPublicacoes(state => state.map( publicacao => {

      if(publicacao.id === publicacaoEditada.id){
        return PublicacaoFactory.create(publicacaoEditada);
      }
      
      return publicacao;

    } ))

  }

  function adicionaNovaPublicacaoAoEstado(publicacaoCadastrada: object) {
    const publicacao = PublicacaoFactory.create(publicacaoCadastrada);

    setPublicacoes(state => [publicacao, ...state])
  }

  return (
    <>

      {
        mensagemToast &&
        <Toast 
          texto={mensagemToast}
          fechaToast={fecharToast}
        />
      }

      {
        indicadorModalPublicarAberto ?
          <ModalPublicar
            modalAberto={indicadorModalPublicarAberto}
            fecharModal={fecharModalPublicar}
            aoPublicar={aoPublicar}
          /> :
          ""
      }

      {
        indicadorModalCompartilharPublicacaoAberto ?
          <ModalCompartilharPublicacao
            publicacao={publicacaoCompartilhada as PublicacaoModel}
            fecharModal={fecharCompartilhamento}
            aoCompartilhar={aoCompartilhar}
          /> :
          ""
      }

      {
        indicadorModalEditarPublicacaoAberto ?
          <ModalEditarPublicacao
            publicacao={publicacaoEditada as PublicacaoModel | PublicacaoCompartilhadaModel}
            fecharModal={fehcarModalEditarPublicacao}
            aoEditar={aoEditar}
            modalAberto={indicadorModalEditarPublicacaoAberto}
          /> :
          ""
      }


      <section id='feed'>

        <div id='feed_adicionarUmaNovaPublicacao'>
          <div id='feed_adicionarUmaNovaPublicacao__container'>
            <img
              src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
              alt="Foto perfil"
              id='feed_adicionarUmaNovaPublicacao__perfil'
            />
            <input
              type="text"
              id='feed_adicionarUmaNovaPublicacao__input'
              placeholder='No que você está pensando, Pedro?'
              onClick={abrirModalPublicar}
              disabled={indicadorModalPublicarAberto ? true : false}
            />
          </div>
          <button id='feed_adicionarUmaNovaPublicacao__btnFotoEVideo' onClick={abrirModalPublicar}>
            <img src="./icones/imagemIcone.png" alt="" />
            Foto/vídeo
          </button>
        </div>

        {
          publicacoes ?
            publicacoes.map(publicacao => {
              if (publicacao instanceof PublicacaoCompartilhadaModel) {
                return <PublicacaoCompartilhada
                  key={publicacao.id}
                  publicacao={publicacao}
                  compartilharPublicacao={abrirCompartilhamento}
                  editarPublicacao={abrirEdicaoPublicacao}
                />
              } else {
                return <Publicacao
                  key={publicacao.id}
                  publicacao={publicacao}
                  compartilharPublicacao={abrirCompartilhamento}
                  editarPublicacao={abrirEdicaoPublicacao}
                />
              }
            }) : ""
        }
      </section>
    </>
  )
}
