import React, { useEffect, useRef, useState } from 'react';
import './ModalOpcoesConta.css';
import { Link } from 'react-router-dom';

export default function ModalOpcoesConta() {

    const btnAbrirModalRef = useRef<HTMLImageElement | null>(null);
    const menuOpcoesDaPublicacaoRef = useRef<HTMLDivElement | null>(null);

    const [indicadorModalAberto, setIndicadorModalAberto] = useState(false);

    function abrirModal() {
        setIndicadorModalAberto(true);
    }

    function fecharModal() {
        setIndicadorModalAberto(false);
    }

    useEffect(() => {

        let handleEscKey = (event: KeyboardEvent) => {
            event.key === 'Escape' && fecharModal();
        }

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickNoDocumento);

        return () => {
            document.removeEventListener('click', handleClickNoDocumento);
        };
    }, [indicadorModalAberto]);

    function handleClickNoDocumento(event: MouseEvent) {
        if (
            menuOpcoesDaPublicacaoRef.current &&
            !menuOpcoesDaPublicacaoRef.current.contains(event.target as Node) &&
            event.target !== btnAbrirModalRef.current
        ) {
            if (indicadorModalAberto) {
                fecharModal();
            }
        }
    }

    return (
        <div id="divModalOpcoesConta">
            <img
                src="./imagensDinamicas/perfil.jpg"
                alt="Perfil usuário"
                onClick={abrirModal}
                ref={btnAbrirModalRef}
                id="divModalOpcoesConta__btnAbrirModal"
            />

            {
                indicadorModalAberto ?
                    <div id="divModalOpcoesConta__modal" ref={menuOpcoesDaPublicacaoRef}>
                        <Link to='/perfil' id="divModalOpcoesConta__modal__linkConta">
                            <img
                                src="./imagensDinamicas/perfil.jpg"
                                alt="Perfil usuário"
                                id='divModalOpcoesConta__linkConta__perfil'
                            />
                            <p id='divModalOpcoesConta__linkConta__nomeUsuario'>Pedro souza</p>
                        </Link>

                        <button className='modalOpcoesConta__btnOpcao'>
                            <i className='material-symbols-outlined'>settings</i>
                            Configurações
                        </button>

                        <button className='modalOpcoesConta__btnOpcao'>
                            <i className='material-symbols-outlined'>logout</i>
                            Sair
                        </button>

                    </div> :
                    ""
            }
        </div>
    )
}
