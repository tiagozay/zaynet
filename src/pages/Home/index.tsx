import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import MenuEsquerdo from '../../components/MenuEsquerdo';
import Publicacao from '../../components/Publicacao';
import './home.css';
import ModalPublicar from '../../components/ModalPublicar';
import { useLocation, useNavigate } from 'react-router-dom';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import PublicacaoCompartilhada from '../../components/PublicacaoCompartilhada';
import UsuarioService from '../../services/UsuarioService';
import { APIService } from '../../services/APIService';
import { PublicacaoFactory } from '../../services/PublicacaoFactory';
import { PublicacaoModel } from '../../models/Publicacao/PublicacaoModel';
import { PublicacaoCompartilhadaModel } from '../../models/Publicacao/PublicacaoCompartilhadaModel';
import { FeedContext } from '../../contexts/FeedContext';

export default function Home() {

  const [modalPublicarAberto, setModalPublicarAberto] = useState(false);
  const [publicacoes, setPublicacoes] = useState<Array<PublicacaoModel | PublicacaoCompartilhadaModel>>([]);

  const navigate = useNavigate();

  const { posicaoFeed } = useContext(FeedContext);

  useEffect(() => {
    if (modalPublicarAberto) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [modalPublicarAberto]);

  function fecharModalPublicar() {
    setModalPublicarAberto(false);
  }

  function abrirModalPublicar() {
    const larguraDaTela = window.innerWidth;
    if (larguraDaTela <= TAMANHO_DE_TELA_MOBILE) {
      navigate('/publicar');
    } else {
      setModalPublicarAberto(true);
    }

  }

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

  useEffect(() => {
    //Toda vez que cair nesta página Home ou mudar o state de publicacoes, buscará a posição do feed que está armazenada no contexto. Esta posição é gravada toda vez que nevegamos desta página home para outra, aí quando volta para cá, já se sabe a posição anterior e retorna para ela (este armazenamento é feito nas publicações, pois é nelas que ocorrem essas mudanças, como ao abrir carrossel de imagens, clicar em compartilhar(para mobile), clicar em editar (para mobile))
    window.scrollTo(0, posicaoFeed);
  }, [publicacoes])


  function aoCadastrarPublicacao(publicacaoCadastrada: object) {
    const publicacao = PublicacaoFactory.create(publicacaoCadastrada);

    setPublicacoes(state => [publicacao, ...state])
  }

  return (
    <>

      {
        modalPublicarAberto ?
          <ModalPublicar
            modalAberto={modalPublicarAberto}
            fecharModal={fecharModalPublicar}
            aoPublicar={aoCadastrarPublicacao}
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
              disabled={modalPublicarAberto ? true : false}
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
                return <PublicacaoCompartilhada key={publicacao.id} publicacao={publicacao} />
              } else {
                return <Publicacao key={publicacao.id} publicacao={publicacao} />
              }
            }) : ""
        }
      </section>
    </>
  )
}
