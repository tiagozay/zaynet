import React, { useEffect, useRef, useState } from 'react';
import './ModalCompartilharPublicacao.css';
import Publicacao from '../Publicacao';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import ModalDeConfirmacao from '../ModalDeConfirmacao';
import UsuarioService from '../../services/UsuarioService';
import { PublicacaoModel } from '../../models/Publicacao/PublicacaoModel';
import TextAreaTamanhoDinamico from '../TextAreaTamanhoDinamico';

interface ModalCompartilharPublicacaoProps {
  publicacao: PublicacaoModel,
  modalAberto: boolean,
  aoCompartilharPublicacao: (textoDigitado: string | null) => void,
  fecharModal: () => void
}

export default function ModalCompartilharPublicacao({ publicacao, modalAberto, aoCompartilharPublicacao, fecharModal }: ModalCompartilharPublicacaoProps) {

  const [modalDeCofirmarDescarteAberto, setModalDeCofirmarDescarteAberto] = useState(false);

  const [textoDigitado, setTextoDigitado] = useState<string | null>(null);

  const overlay = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

  useEffect(() => {

    let handleEscKey = (event: KeyboardEvent) => {
      event.key === 'Escape' && aoFecharModal();
    }

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      fecharModal();
    }
  }, [isMobile]);

  function abrirConfirmacaoDeDescarte() {
    setModalDeCofirmarDescarteAberto(true);
  }

  function fecharConfirmacaoDeDescarte() {
    setModalDeCofirmarDescarteAberto(false);
  }

  function confirmarDescarteDePublicacao() {
    fecharModal();
  }

  function aoFecharModal() {
    abrirConfirmacaoDeDescarte();
  }

  function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === overlay.current) {
      aoFecharModal();
    }
  }

  function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextoDigitado(e.target.value.trim());
  }

  function compartilharPublicacao() {
    aoCompartilharPublicacao(textoDigitado);
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
              onClick={aoFecharModal}
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
            >Compartilhar</button>
          </div>
        </div>
      </div>
    </>

  )
}
