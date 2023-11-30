import React, { useState } from 'react'
import './MenuEsquerdo.css';
import { Link, useNavigate } from 'react-router-dom';
import ModalPublicar from '../ModalPublicar';

export default function MenuEsquerdo() {

    const navigate = useNavigate();

    const [modalPublicarAberto, setModalPublicarAberto] = useState(false);

    function fecharModalPublicar() {
        setModalPublicarAberto(false);
    }

    function abrirModalPublicar() {
        navigate('/');
        setModalPublicarAberto(true);
    }


    return (
        <>
            <ModalPublicar modalAberto={modalPublicarAberto} fecharModal={fecharModalPublicar} />
            <nav id='menuEsquerdo'>
                <ul id='menuEsquerdo__opcoes'>
                    <li id='menuEsquerdo__opcao'>
                        <Link id='menuEsquerdo__opcao__botao' to="/perfil">
                            <img src="./imagensDinamicas/perfil.jpg" alt="Foto do perfil" id='menuEsquerdo__opcao__perfil' />
                            <p id="menuEsquerdo__opcao__nome">Tiago zay</p>
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
