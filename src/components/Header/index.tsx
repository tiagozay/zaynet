import React from 'react'
import './header.css';
import logo from './logo.jpg';

export default function Header() {
    return (
        <header id='cabecalhoPrincipal'>
            <div id='containerLogoEInput'>
                <img src={logo} alt="Logo ZayNet" id='logoHeader' />
                <div id='divInputPesquisarHeader'>
                    <i className='material-symbols-outlined'>search</i>
                    <input type="text" placeholder='Pesquisar no ZayNet' id='inputPesquisarHeader' />
                </div>
            </div>

            <div id='seletorCentral'>
                <a className='material-symbols-outlined seletorCentralIcone seletorCentralIconeSelecionado'>home</a>
                <a className='material-symbols-outlined seletorCentralIcone'>group</a>
            </div>

            <div id='opcoesHeader'>
                <i className='material-symbols-outlined opcoesHeaderIcone'>group_add</i>
                <i className='material-symbols-outlined opcoesHeaderIcone'>chat_bubble</i>
                <i className='material-symbols-outlined opcoesHeaderIcone'>notifications</i>
                <i className='opcoesHeaderIcone' id='opcoesHeaderIcone__perfil'>
                    <img src="imagensDinamicas/perfil.jpg" alt="" />
                </i>
            </div>

        </header>
    )
}
