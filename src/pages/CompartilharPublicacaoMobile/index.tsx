import React, { useContext, useEffect, useState } from 'react';
import './CompartilharPublicacaoMobile.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Publicacao from '../../components/Publicacao';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import UsuarioService from '../../services/UsuarioService';
import { PublicacaoService } from '../../services/PublicacaoService';
import TextAreaTamanhoDinamico from '../../components/TextAreaTamanhoDinamico';
import { CompartilharPublicacaoContext } from '../../contexts/CompartilharPublicacaoContext';
import { LoginService } from '../../services/LoginService';
import { ControleLoginContext } from '../../contexts/ControleLoginContext';

export default function CompartilharPublicacaoMobile({ }) {

    const { permisaoParaIniciar, setPermisaoParaIniciar } = useContext(ControleLoginContext);

    const {
        textoDigitado,
        setTextoDigitado,
        setIndicadorModalCompartilharPublicacaoAberto
    } = useContext(CompartilharPublicacaoContext);

    const navigate = useNavigate();

    const location = useLocation();

    const publicacao = location.state;

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

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
        if (!isMobile) {
            fecharCompartilhamento()
        }
    }, [isMobile]);

    function fecharCompartilhamento() {
        setIndicadorModalCompartilharPublicacaoAberto(false);
        setTextoDigitado(null);
        navigate(-1);
    }

    function aoClicarEmVoltar() {
        fecharCompartilhamento();
    }

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDigitado(e.target.value);
    }

    function compartilhar() {
        PublicacaoService.compartilhar(textoDigitado, publicacao)
            .then(() => {
                navigate(-1);
            })
            .catch(() => { });
    }

    return (
        permisaoParaIniciar &&
        <div id="compartilharPublicacaoMobile__page">
            <div id="compartilharPublicacaoMobile__cabecalho">
                <div id="compartilharPublicacaoMobile__cabecalho__container">
                    <button
                        onClick={aoClicarEmVoltar}
                        className='material-symbols-outlined'
                        id='compartilharPublicacaoMobile__btnVoltar'
                    >arrow_back</button>
                    <h3 id="compartilharPublicacaoMobile__titulo">Compartilhar publicação</h3>
                </div>
                <button
                    id="compartilharPublicacaoMobile__btnPublicar"
                    onClick={compartilhar}
                >COMPARTILHAR</button>
            </div>

            <div id="compartilharPublicacaoMobile__container">
                <div id="compartilharPublicacaoMobile__divPerfilENomeUsuario">
                    <img
                        src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
                        alt="Perfil usuário"
                        id="compartilharPublicacaoMobile__divPerfilENomeUsuario__perfil"
                    />
                    <p
                        id="compartilharPublicacaoMobile__divPerfilENomeUsuario__nome"
                    >Pedro souza</p>
                </div>

                <TextAreaTamanhoDinamico
                    id="compartilharPublicacaoMobile__campoTexto"
                    placeholder='No que você está pensando, Pedro?'
                    onChange={aoDigitarTexto}
                    alturaInicial={80}
                    value={textoDigitado}
                />

                <div id='compartilharPublicacaoMobile__containerPublicacao'>
                    <Publicacao
                        publicacao={publicacao}
                        publicacaoCompartilhada
                    />
                </div>

            </div>
        </div>

    )
}
