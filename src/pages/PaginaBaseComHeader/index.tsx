import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Outlet, useNavigate } from 'react-router-dom';
import MenuEsquerdo from '../../components/MenuEsquerdo';
import ContatosChat from '../../components/ContatosChat';
import { LoginService } from '../../services/LoginService';
import PageLoading from '../../components/PageLoading';

export default function PaginaBaseComHeader() {

    const [indicadorPermisaoParaIniciar, setIndicadorPermisaoParaIniciar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        LoginService.verificaSeHaLoginValido()
            .then( loginValido => {
                if(loginValido){
                    setIndicadorPermisaoParaIniciar(true);
                }else{
                    navigate('/login');
                }
            } );
    }, []);

    return (
        <>
            {
                !indicadorPermisaoParaIniciar ?
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
