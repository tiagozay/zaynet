import React from 'react'
import './MenuEsquerdo.css';
import { Link } from 'react-router-dom';

export default function MenuEsquerdo() {
    return (
        <nav id='menuEsquerdo'>
            <ul id='menuEsquerdo__opcoes'>
                <li id='menuEsquerdo__opcao'>
                    <Link to="/">
                        <img src="./imagensDinamicas/perfil.jpg" alt="Foto do perfil" id='menuEsquerdo__opcao__perfil' />
                        <p id="menuEsquerdo__opcao__nome">Tiago zay</p>
                    </Link>
                </li>
                <li id='menuEsquerdo__opcao'>
                    <Link to="/">
                        <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>feed</i>
                        <p id="menuEsquerdo__opcao__nome">Home</p>
                    </Link>
                </li>
                <li id='menuEsquerdo__opcao'>
                    <Link to="/adicionarAmigos">
                        <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>group_add</i>
                        <p id="menuEsquerdo__opcao__nome">Adicionar amigos</p>
                    </Link>
                </li>
                <li id='menuEsquerdo__opcao'>
                    <Link to="">
                        <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>image</i>
                        <p id="menuEsquerdo__opcao__nome">Fotos</p>
                    </Link>
                </li>
                <li id='menuEsquerdo__opcao'>
                    <Link to="">
                        <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>movie</i>
                        <p id="menuEsquerdo__opcao__nome">Vídeos</p>
                    </Link>
                </li>
                <li id='menuEsquerdo__opcao'>
                    <Link to="">
                        <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>post_add</i>
                        <p id="menuEsquerdo__opcao__nome">Publicar</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
