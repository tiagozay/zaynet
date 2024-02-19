import React, { useContext, useEffect, useRef, useState } from 'react';
import './ModalCompartilharPublicacao.css';
import Publicacao from '../Publicacao';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import ModalDeConfirmacao from '../ModalDeConfirmacao';
import UsuarioService from '../../services/UsuarioService';
import { PublicacaoModel } from '../../models/Publicacao/PublicacaoModel';
import TextAreaTamanhoDinamico from '../TextAreaTamanhoDinamico';
import { CompartilharPublicacaoContext } from '../../contexts/CompartilharPublicacaoContext';
import { PublicacaoService } from '../../services/PublicacaoService';

interface ModalCompartilharPublicacaoProps {
  publicacao: PublicacaoModel,
  aoCompartilhar: (publicacaoCadastrada: object) => void,
  fecharModal: () => void
}

export default function ModalCompartilharPublicacao({ publicacao, aoCompartilhar, fecharModal }: ModalCompartilharPublicacaoProps) {

  const [modalDeCofirmarDescarteAberto, setModalDeCofirmarDescarteAberto] = useState(false);
  const [indicadorCadastroSendoEnviado, setIndicadorCadastroSendoEnviado] = useState(false);

  const { textoDigitado, setTextoDigitado } = useContext(CompartilharPublicacaoContext);

  const overlay = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

  useEffect(() => {

    let handleEscKey = (event: KeyboardEvent) => {
      event.key === 'Escape' && clickFecharModal();
    }

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      fecharModalELimparTexto();
    }
  }, [isMobile]);

  function abrirConfirmacaoDeDescarte() {
    setModalDeCofirmarDescarteAberto(true);
  }

  function fecharConfirmacaoDeDescarte() {
    setModalDeCofirmarDescarteAberto(false);
  }

  function confirmarDescarteDePublicacao() {
    fecharModalELimparTexto();
  }

  function fecharModalELimparTexto() {
    setTextoDigitado("");
    fecharModal();
  }

  function clickFecharModal() {
    abrirConfirmacaoDeDescarte();
  }

  function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === overlay.current) {
      clickFecharModal();
    }
  }

  function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextoDigitado(e.target.value);
  }

  function compartilharPublicacao() {
    setIndicadorCadastroSendoEnviado(true);
    PublicacaoService.compartilhar(textoDigitado, publicacao)
      .then((res) => {

        fecharModalELimparTexto();
        aoCompartilhar(res.data as object);
        setIndicadorCadastroSendoEnviado(false);

      })
      .catch(() => {
        setIndicadorCadastroSendoEnviado(false);
      })
  }

  return (
    <>
      {
        modalDeCofirmarDescarteAberto ?
          <ModalDeConfirmacao
            aoConfirmar={confirmarDescarteDePublicacao}
            fecharModal={fecharConfirmacaoDeDescarte}
            mensagem='Deseja realmente descartar esta publicação?'
            titulo='Descartar publicação'
            modalAberto={modalDeCofirmarDescarteAberto}
          /> :
          ""
      }

      <div id="modalCompartilharPublicacao__overlay" ref={overlay} onClick={clickOverlay}>
        <div id="modalCompartilharPublicacao">
          <div id='modalCompartilharPublicacao__tituloEBtnDeFechar'>
            <h3 id='modalCompartilharPublicacao__tituloModal'>Compartilhar publicação</h3>
            <button
              id='modalCompartilharPublicacao__btnFechar'
              className='material-symbols-outlined'
              onClick={clickFecharModal}
            >close</button>
          </div>
          <div id='modalCompartilharPublicacao__container'>
            <div id="modalCompartilharPublicacao__nomeEPerfilDoUsuario">
              <img
                src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
                alt="Perfil usuário"
                id="modalCompartilharPublicacao__perfilUsuario"
              />
              <p id="modalCompartilharPublicacao__nomeUsuario">{UsuarioService.obtemNomeCompletoDoUsuarioLogado()}</p>
            </div>

            <div id='modalCompartilharPublicacao__containerInputs'>
              <TextAreaTamanhoDinamico
                id='modalCompartilharPublicacao__campoTexto'
                placeholder='No que você está pensando, Pedro?'
                onChange={aoDigitarTexto}
                alturaInicial={60}
                value={textoDigitado}
              />
              <div id='modalCompartilharPublicacao__containerPublicacao'>
                <Publicacao
                  publicacao={publicacao}
                  publicacaoCompartilhada
                />
              </div>

            </div>
            <button
              id='modalCompartilharPublicacao__btnPublicar'
              onClick={compartilharPublicacao}
              className={indicadorCadastroSendoEnviado ? "modalCompartilharPublicacao__btnPublicarCarregando" : ""}
              disabled={indicadorCadastroSendoEnviado}
            >Compartilhar</button>
          </div>
        </div>
      </div>
    </>

  )
}
