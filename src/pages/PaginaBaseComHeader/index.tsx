import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Outlet, useNavigate } from 'react-router-dom';
import MenuEsquerdo from '../../components/MenuEsquerdo';
import ContatosChat from '../../components/ContatosChat';
import { LoginService } from '../../services/LoginService';
import PageLoading from '../../components/PageLoading';
import { ControleLoginContext } from '../../contexts/ControleLoginContext';

export default function PaginaBaseComHeader() {

    const {permisaoParaIniciar, setPermisaoParaIniciar} = useContext(ControleLoginContext);

    const navigate = useNavigate();

    useEffect(() => {
        LoginService.verificaSeHaLoginValido()
            .then( loginValido => {
                if(loginValido){
                    setPermisaoParaIniciar(true);
                }else{
                    navigate('/login');
                }
            } )
            .catch(() => {})
    }, []);

    return (
        <>
            {
                !permisaoParaIniciar ?
                    <PageLoading /> :
                    <>
                        <MenuEsquerdo></MenuEsquerdo>
                        <Header />
                        <Outlet />
                        <ContatosChat />
                    </>
            }

        </>
    );
}
