import React, { useEffect, useRef } from 'react';
import './PesquisarPorUmaPessoaMobile.css';
import { useNavigate } from 'react-router-dom';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';

export default function PesquisarPorUmaPessoaMobile() {

    const navigate = useNavigate();

    function voltar() {
        navigate(-1);
    }

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();

        if(window.innerWidth > TAMANHO_DE_TELA_MOBILE){
            navigate('/');
        }
    }, []);
    
    return (
        <section id='pesquisarPorUmaPessoaMobile_page'>
            <div id='pesquisarPorUmaPessoaMobile__divInputEBtnVoltar'>
                <button
                    className='material-symbols-outlined'
                    id='pesquisarPorUmaPessoaMobile__btnVoltar'
                    onClick={voltar}
                >arrow_back_ios</button>
                <input
                    type="search"
                    id='pesquisarPorUmaPessoaMobile__inputPesquisar'
                    placeholder='Pesquisar'
                    ref={inputRef}
                />
            </div>

            <ul id="pesquisarPorUmaPessoaMobile__listaDeResultados">
                <li id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado'>
                    <img 
                        src="./imagensDinamicas/perfil.jpg" 
                        alt="Perfil usuário" 
                        id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__perfil'
                    />
                    <p id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__nome'>
                        Pedro souza
                    </p>
                </li>   
                <li id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado'>
                    <img 
                        src="./imagensDinamicas/perfil2.jpg" 
                        alt="Perfil usuário" 
                        id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__perfil'
                    />
                    <p id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__nome'>
                        Maria almeida
                    </p>
                </li>   
                <li id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado'>
                    <img 
                        src="./imagensDinamicas/perfil.jpg" 
                        alt="Perfil usuário" 
                        id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__perfil'
                    />
                    <p id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__nome'>
                        Pedro souza
                    </p>
                </li>   
                <li id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado'>
                    <img 
                        src="./imagensDinamicas/perfil.jpg" 
                        alt="Perfil usuário" 
                        id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__perfil'
                    />
                    <p id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__nome'>
                        Pedro souza
                    </p>
                </li>   
                <li id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado'>
                    <img 
                        src="./imagensDinamicas/perfil2.jpg" 
                        alt="Perfil usuário" 
                        id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__perfil'
                    />
                    <p id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__nome'>
                        Maria almeida
                    </p>
                </li>  
            </ul>

        </section>
    )
}
