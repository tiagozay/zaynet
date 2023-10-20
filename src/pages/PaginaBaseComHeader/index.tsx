import React from 'react'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom';
import MenuEsquerdo from '../../components/MenuEsquerdo';

export default function PaginaBaseComHeader() {
    return (
        <>
            <MenuEsquerdo></MenuEsquerdo>
            <Header />
            <Outlet />
        </>
    );
}
