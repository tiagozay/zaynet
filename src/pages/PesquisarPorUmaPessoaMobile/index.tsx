import React, { useEffect, useRef } from 'react';
import './PesquisarPorUmaPessoaMobile.css';
import { useNavigate } from 'react-router-dom';
import { tamanhoDeTelaMobile } from '../../config';

export default function PesquisarPorUmaPessoaMobile() {

    const navigate = useNavigate();

    function voltar() {
        navigate(-1);
    }

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();

        if(window.innerWidth > tamanhoDeTelaMobile){
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
                >arrow_back</button>
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
                        Tiago zay
                    </p>
                </li>   
                <li id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado'>
                    <img 
                        src="./imagensDinamicas/perfil2.jpg" 
                        alt="Perfil usuário" 
                        id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__perfil'
                    />
                    <p id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__nome'>
                        Ervino zay
                    </p>
                </li>   
                <li id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado'>
                    <img 
                        src="./imagensDinamicas/perfil.jpg" 
                        alt="Perfil usuário" 
                        id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__perfil'
                    />
                    <p id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__nome'>
                        Tiago zay
                    </p>
                </li>   
                <li id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado'>
                    <img 
                        src="./imagensDinamicas/perfil.jpg" 
                        alt="Perfil usuário" 
                        id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__perfil'
                    />
                    <p id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__nome'>
                        Tiago zay
                    </p>
                </li>   
                <li id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado'>
                    <img 
                        src="./imagensDinamicas/perfil2.jpg" 
                        alt="Perfil usuário" 
                        id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__perfil'
                    />
                    <p id='pesquisarPorUmaPessoaMobile__listaDeResultados__resultado__nome'>
                        Ervino zay
                    </p>
                </li>  
            </ul>

        </section>
    )
}
