import React from 'react'
import './header.css';
import LogoEInputPesquisa from './LogoEInputPesquisa';
import SeletorCentral from './SeletorCentral';
import OpcoesHeader from './OpcoesHeader';

export default function Header() {
    return (
        <header id='cabecalhoPrincipal'>
            <LogoEInputPesquisa />

            <SeletorCentral />

            <OpcoesHeader />

        </header>
    )
}
