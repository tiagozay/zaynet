import React, { useContext, useEffect, useState } from 'react';
import './ConfiguracoesContaMobile.css';
import ModalDeConfirmacao from '../../components/ModalDeConfirmacao';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import { ControleLoginContext } from '../../contexts/ControleLoginContext';
import { LoginService } from '../../services/LoginService';

export default function ConfiguracoesContaMobile() {

    const usuario = {
        email: 'pedrosouza@gmail.com'
    }

    const { permisaoParaIniciar, setPermisaoParaIniciar } = useContext(ControleLoginContext);

    const [indicadorAlteracaoRealizada, setIndicadorAlteracaoRealizada] = useState(false);
    const [modalDeConfirmacaoDeDescarteAberto, setmodalDeConfirmacaoDeDescarteAberto] = useState(false);

    const [indicadorExibirSenha, setIndicadorExibirSenha] = useState(false);
    const [indicadorExibirNovaSenha, setIndicadorExibirNovaSenha] = useState(false);

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");

    useEffect(() => {
        setEmail(usuario.email);
    }, []);

    useEffect(() => {

        LoginService.verificaSeHaLoginValido()
            .then(loginValido => {
                if (loginValido) {
                    setPermisaoParaIniciar(true);
                } else {
                    navigate('/login');
                }
            })
            .catch(() => { })
    }, [permisaoParaIniciar]);

    useEffect(() => {
        if (
            senha.trim().length > 0 &&
            email !== usuario.email ||
            novaSenha.trim().length > 0
        ) {
            setIndicadorAlteracaoRealizada(true);
        } else {
            setIndicadorAlteracaoRealizada(false);
        }
    }, [
        senha,
        email,
        novaSenha
    ]);

    useEffect(() => {
        if (!isMobile) {
            navigate(-1);
        }
    }, [isMobile]);

    function aoClicarEmVoltar() {
        if (indicadorAlteracaoRealizada) {
            abrirModalDeConfirmacaoDeDescarte();
        } else {
            navigate(-1);
        }

    }

    function abrirModalDeConfirmacaoDeDescarte() {
        setmodalDeConfirmacaoDeDescarteAberto(true);
    }

    function fecharModalDeConfirmacaoDeDescarte() {
        setmodalDeConfirmacaoDeDescarteAberto(false);
    }

    function aoConfirmarDescarte() {
        navigate(-1);
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
        permisaoParaIniciar && 
        <>
            {
                modalDeConfirmacaoDeDescarteAberto ?
                    <ModalDeConfirmacao
                        aoConfirmar={aoConfirmarDescarte}
                        fecharModal={fecharModalDeConfirmacaoDeDescarte}
                        mensagem='Deseja realmente descartar as alterações?'
                        titulo='Descartar alterações?'
                        modalAberto={modalDeConfirmacaoDeDescarteAberto}
                    /> : ""
            }
            <div id="editarContaMobile__page">
                <div id="editarContaMobile__cabecalho">
                    <div id="editarContaMobile__cabecalho__container">
                        <button
                            onClick={aoClicarEmVoltar}
                            className='material-symbols-outlined'
                            id='editarContaMobile__btnVoltar'
                        >arrow_back</button>
                        <h3 id="editarContaMobile__titulo">Editar conta</h3>
                    </div>
                    <button
                        id="editarContaMobile__btnSalvar"
                        disabled={!indicadorAlteracaoRealizada}
                        className={!indicadorAlteracaoRealizada ? "editarContaMobile__btnSalvarInativo" : ""}
                    >SALVAR</button>
                </div>

                <div id="editarContaMobile__container">
                    <div id='modalEditarContaMobile__divCampoTexto'>
                        <label
                            id='modalEditarContaMobile__divCampoTextoLabel'
                            htmlFor='modalEditarContaMobile__divCampoTextoInput'
                        >Informe sua senha</label>

                        <div id='modalEditarContaMobile__divCampoTexto__divInputSenha'>
                            <input
                                type={indicadorExibirSenha ? "text" : "password"}
                                id='modalEditarContaMobile__divCampoTextoInput'
                                onChange={aoDigitarSenha}
                                value={senha}
                            />
                            <button
                                className='material-symbols-outlined'
                                onClick={clickExibirSenha}
                            >{indicadorExibirSenha ? "visibility_off" : "visibility"}</button>
                        </div>
                    </div>

                    <div id='modalEditarContaMobile__divCampoTexto'>
                        <label
                            id='modalEditarContaMobile__divCampoTextoLabel'
                            htmlFor='modalEditarContaMobile__divCampoTextoInput'
                        >E-mail</label>
                        <input type="mail" id='modalEditarContaMobile__divCampoTextoInput' onChange={aoDigitarEmail} value={email} />
                    </div>

                    <div id='modalEditarContaMobile__divCampoTexto'>
                        <label
                            id='modalEditarContaMobile__divCampoTextoLabel'
                            htmlFor='modalEditarContaMobile__divCampoTextoInput'
                        >Nova senha</label>
                        <div id='modalEditarContaMobile__divCampoTexto__divInputSenha'>
                            <input
                                type={indicadorExibirNovaSenha ? "text" : "password"}
                                id='modalEditarContaMobile__divCampoTextoInput'
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
            </div>
        </>
    )
}
