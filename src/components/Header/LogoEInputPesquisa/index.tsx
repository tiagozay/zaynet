import React from 'react';
import logo from './logo.jpg';
import './LogoEInputPesquisa.css';

export default function LogoEInputPesquisa() {
    return (
        <div id='containerLogoEInput'>
            <img src={logo} alt="Logo ZayNet" id='logoHeader' />
            <div id='divInputPesquisarHeader'>
                <i className='material-symbols-outlined'>search</i>
                <input type="text" placeholder='Pesquisar no ZayNet' id='inputPesquisarHeader' />
            </div>
        </div>
    )
}
