import React from 'react'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom';
import MenuEsquerdo from '../../components/MenuEsquerdo';
import ContatosChat from '../../components/ContatosChat';

export default function PaginaBaseComHeader() {
    return (
        <>
            <MenuEsquerdo></MenuEsquerdo>
            <Header />
            <Outlet />
            <ContatosChat />
        </>
    );
}
