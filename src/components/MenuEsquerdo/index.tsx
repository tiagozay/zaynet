import React, { useEffect, useState } from 'react'
import './MenuEsquerdo.css';
import { Link, useNavigate } from 'react-router-dom';
import ModalPublicar from '../ModalPublicar';
import secureLocalStorage from 'react-secure-storage';
import { LoginService } from '../../services/LoginService';
import UsuarioService from '../../services/UsuarioService';

export default function MenuEsquerdo() {

    const navigate = useNavigate();

    const [modalPublicarAberto, setModalPublicarAberto] = useState(false);

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
        navigate('/');
        setModalPublicarAberto(true);
    }


    return (
        <>
            {
                modalPublicarAberto ?
                    <ModalPublicar
                        modalAberto={modalPublicarAberto}
                        fecharModal={fecharModalPublicar}
                    /> :
                    ""
            }

            <nav id='menuEsquerdo'>
                <ul id='menuEsquerdo__opcoes'>
                    <li id='menuEsquerdo__opcao'>
                        <Link id='menuEsquerdo__opcao__botao' to="/perfil">
                            <img src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()} alt="Foto do perfil" id='menuEsquerdo__opcao__perfil' />
                            <p id="menuEsquerdo__opcao__nome">{UsuarioService.obtemNomeCompletoDoUsuarioLogado()}</p>
                        </Link>
                    </li>
                    <li id='menuEsquerdo__opcao'>
                        <Link id='menuEsquerdo__opcao__botao' to="/">
                            <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>feed</i>
                            <p id="menuEsquerdo__opcao__nome">Home</p>
                        </Link>
                    </li>
                    <li id='menuEsquerdo__opcao'>
                        <Link id='menuEsquerdo__opcao__botao' to="/adicionarAmigos">
                            <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>group_add</i>
                            <p id="menuEsquerdo__opcao__nome">Adicionar amigos</p>
                        </Link>
                    </li>
                    <li id='menuEsquerdo__opcao'>
                        <Link id='menuEsquerdo__opcao__botao' to="/fotos">
                            <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>image</i>
                            <p id="menuEsquerdo__opcao__nome">Fotos</p>
                        </Link>
                    </li>
                    <li id='menuEsquerdo__opcao'>
                        <Link id='menuEsquerdo__opcao__botao' to="">
                            <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>movie</i>
                            <p id="menuEsquerdo__opcao__nome">Vídeos</p>
                        </Link>
                    </li>
                    <li id='menuEsquerdo__opcao'>
                        <button id='menuEsquerdo__opcao__botao' onClick={abrirModalPublicar}>
                            <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>post_add</i>
                            <p id="menuEsquerdo__opcao__nome">Publicar</p>
                        </button>
                    </li>
                </ul>
            </nav>
        </>

    )
}
