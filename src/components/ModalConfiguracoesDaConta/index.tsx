import React, { useEffect, useRef, useState } from 'react';
import './ModalConfiguracoesDaConta.css';
import ModalDeConfirmacao from '../ModalDeConfirmacao';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';

interface ModalEditarContaProps {
    modalAberto: boolean,
    fecharModal: () => void
}


export default function ModalConfiguracoesDaConta({ modalAberto, fecharModal }: ModalEditarContaProps) {

    const usuario = {
        email: 'pedrosouza@gmail.com'
    }

    const overlay = useRef(null);

    const isMobile = useMediaQuery({maxWidth: TAMANHO_DE_TELA_MOBILE});

    const [indicadorModificacaoRealizada, setIndicadorModificacaoRealizada] = useState(false);
    const [indicadorModalConfirmacaoDescarteAberto, setIndicadorModalConfirmacaoDescarteAberto] = useState(false);

    const [indicadorExibirSenha, setIndicadorExibirSenha] = useState(false);
    const [indicadorExibirNovaSenha, setIndicadorExibirNovaSenha] = useState(false);

    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");

    useEffect(() => {
        setEmail(usuario.email);
      }, [modalAberto]);

    useEffect(() => {
        if (
            senha.trim().length > 0 &&
            email !== usuario.email ||
            novaSenha.trim().length > 0
        ) {
          setIndicadorModificacaoRealizada(true);
        } else {
          setIndicadorModificacaoRealizada(false);
        }
      }, [
        senha,
        email,
        novaSenha
      ]);

      useEffect(() => {
        if (isMobile) {
          fecharModal();
        }
      }, [isMobile]);

    function salvarAlteracoes() {

    }

    function fechaEdicao() {
        if (indicadorModificacaoRealizada) {
            abrirModalConfirmacaoDeDescarte();
        } else {
            fecharModal();
        }
    }

    function confirmarDescarte() {
        fecharModal();
    }

    function abrirModalConfirmacaoDeDescarte() {
        setIndicadorModalConfirmacaoDescarteAberto(true);
    }

    function fecharModalConfirmacaoDeDescarte() {
        setIndicadorModalConfirmacaoDescarteAberto(false);
    }

    function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === overlay.current) {
            fechaEdicao();
        }
    }

    function clickExibirSenha() {
        setIndicadorExibirSenha(state => !state);
    }

    function clickExibirNovaSenha() {
        setIndicadorExibirNovaSenha(state => !state);
    }

    function aoDigitarSenha(e: React.ChangeEvent<HTMLInputElement>) {
        setSenha(e.target.value);
    }

    function aoDigitarEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function aoDigitarNovaSenha(e: React.ChangeEvent<HTMLInputElement>) {
        setNovaSenha(e.target.value);
    }


    return (
        <>
            {
                indicadorModalConfirmacaoDescarteAberto ?
                    <ModalDeConfirmacao
                        aoConfirmar={confirmarDescarte}
                        fecharModal={fecharModalConfirmacaoDeDescarte}
                        titulo='Descartar alterações?'
                        mensagem='Deseja mesmo descartar as alterações?'
                        modalAberto={indicadorModalConfirmacaoDescarteAberto}
                    /> : ""
            }

            <div id="modalEditarConta__overlay" ref={overlay} onClick={clickOverlay}>
                <div id="modalEditarConta">
                    <div id='modalEditarConta__tituloEBtnDeFechar'>
                        <h3 id='modalEditarConta__tituloModal'>Editar conta</h3>
                        <button
                            id='modalEditarConta__btnFechar'
                            className='material-symbols-outlined'
                            onClick={fechaEdicao}
                        >close</button>
                    </div>
                    <div id='modalEditarConta__container'>

                        <div id='modalEditarConta__container__inputs'>
                            <div id='modalEditarConta__divCampoTexto'>
                                <label
                                    id='modalEditarConta__divCampoTextoLabel'
                                    htmlFor='modalEditarConta__divCampoTextoInput'
                                >Informe sua senha</label>

                                <div id='modalEditarConta__divCampoTexto__divInputSenha'>
                                    <input
                                        type={indicadorExibirSenha ? "text" : "password"}
                                        id='modalEditarConta__divCampoTextoInput'
                                        onChange={aoDigitarSenha}
                                        value={senha}
                                    />
                                    <button
                                        className='material-symbols-outlined'
                                        onClick={clickExibirSenha}
                                    >{indicadorExibirSenha ? "visibility_off" : "visibility"}</button>
                                </div>
                            </div>

                            <div id='modalEditarConta__divCampoTexto'>
                                <label
                                    id='modalEditarConta__divCampoTextoLabel'
                                    htmlFor='modalEditarConta__divCampoTextoInput'
                                >E-mail</label>
                                <input type="mail" id='modalEditarConta__divCampoTextoInput' onChange={aoDigitarEmail} value={email} />
                            </div>

                            <div id='modalEditarConta__divCampoTexto'>
                                <label
                                    id='modalEditarConta__divCampoTextoLabel'
                                    htmlFor='modalEditarConta__divCampoTextoInput'
                                >Nova senha</label>
                                <div id='modalEditarConta__divCampoTexto__divInputSenha'>
                                    <input
                                        type={indicadorExibirNovaSenha ? "text" : "password"}
                                        id='modalEditarConta__divCampoTextoInput'
                                        onChange={aoDigitarNovaSenha}
                                        value={novaSenha}
                                    />
                                    <button
                                        className='material-symbols-outlined'
                                        onClick={clickExibirNovaSenha}
                                    >{indicadorExibirNovaSenha ? "visibility_off" : "visibility"}</button>
                                </div>
                            </div>

                        </div>
                        <button
                            id='modalEditarConta__btnSalvar'
                            disabled={!indicadorModificacaoRealizada}
                            className={!indicadorModificacaoRealizada ? "modalEditarConta__btnSalvarInativo" : ""}
                            onClick={salvarAlteracoes}
                        >Salvar</button>
                    </div>
                </div>
            </div>
        </>
    )
}
