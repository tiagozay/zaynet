import React, { useEffect, useRef, useState } from 'react';
import './ModalOpcoesConta.css';
import { Link, useNavigate } from 'react-router-dom';
import ModalConfiguracoesDaConta from '../../../ModalConfiguracoesDaConta';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../../../config';
import { LoginService } from '../../../../services/LoginService';
import UsuarioService from '../../../../services/UsuarioService';

export default function ModalOpcoesConta() {

    const btnAbrirModalRef = useRef<HTMLImageElement | null>(null);
    const menuOpcoesDaPublicacaoRef = useRef<HTMLDivElement | null>(null);

    const [indicadorMenuAberto, setIndicadorMenuAberto] = useState(false);
    const [indicadorModalConfiguracoesContaAberto, setIndicadorModalConfiguracoesContaAberto] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    const navigate = useNavigate();

    function abrirModal() {
        setIndicadorMenuAberto(true);
    }

    function fecharModal() {
        setIndicadorMenuAberto(false);
    }

    function abrirModalConfiguracoesConta() {
        if(isMobile){
            navigate('/configuracoesConta');
        }else{
            setIndicadorModalConfiguracoesContaAberto(true);
        }
    }

    function fecharModalConfiguracoesConta() {
        setIndicadorModalConfiguracoesContaAberto(false);
    }

    useEffect(() => {
        if (indicadorModalConfiguracoesContaAberto) {
          document.body.style.overflowY = 'hidden';
        } else {
          document.body.style.overflowY = 'scroll';
        }
      }, [indicadorModalConfiguracoesContaAberto]);

    useEffect(() => {

        let handleEscKey = (event: KeyboardEvent) => {
            event.key === 'Escape' && fecharModal();
        }

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickNoDocumento);

        return () => {
            document.removeEventListener('click', handleClickNoDocumento);
        };
    }, [indicadorMenuAberto]);

    function handleClickNoDocumento(event: MouseEvent) {
        if (
            menuOpcoesDaPublicacaoRef.current &&
            !menuOpcoesDaPublicacaoRef.current.contains(event.target as Node) &&
            event.target !== btnAbrirModalRef.current
        ) {
            if (indicadorMenuAberto) {
                fecharModal();
            }
        }
    }

    function clickLogout()
    {
        LoginService.logout(navigate);
    }

    function aoAbrirPerfil()
    {
        fecharModal();
    }

    return (
        <>
            {
                indicadorModalConfiguracoesContaAberto ?
                    <ModalConfiguracoesDaConta
                        fecharModal={fecharModalConfiguracoesConta}
                        modalAberto={indicadorModalConfiguracoesContaAberto}
                    /> :
                    ""
            }
            <div id="divModalOpcoesConta">
                <img
                    src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
                    alt="Perfil usuário"
                    onClick={abrirModal}
                    ref={btnAbrirModalRef}
                    id="divModalOpcoesConta__btnAbrirModal"
                />

                {
                    indicadorMenuAberto ?
                        <div id="divModalOpcoesConta__modal" ref={menuOpcoesDaPublicacaoRef}>
                            <Link to={`/perfil/${UsuarioService.obtemIdUsuarioLogado()}`} id="divModalOpcoesConta__modal__linkConta" onClick={aoAbrirPerfil}>
                                <img
                                    src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
                                    alt="Perfil usuário"
                                    id='divModalOpcoesConta__linkConta__perfil'
                                />
                                <p id='divModalOpcoesConta__linkConta__nomeUsuario'>{UsuarioService.obtemNomeCompletoDoUsuarioLogado()}</p>
                            </Link>

                            <button className='modalOpcoesConta__btnOpcao' onClick={abrirModalConfiguracoesConta}>
                                <i className='material-symbols-outlined'>settings</i>
                                Configurações
                            </button>

                            <button className='modalOpcoesConta__btnOpcao' onClick={clickLogout}>
                                <i className='material-symbols-outlined'>logout</i>
                                Sair
                            </button>

                        </div> :
                        ""
                }
            </div>
        </>

    )
}
