import React, { useRef, useState, useEffect } from 'react';
import './ContatosChat.css';

export default function ContatosChat() {

    const [indicadorInputPesquisaAberto, setIndicadorInputPesquisaAberto] = useState(false);

    const inputBuscarRef = useRef<HTMLInputElement | null>(null);

    function clickAbrirInputDeBuscaContato() {
        setIndicadorInputPesquisaAberto(true);
    }

    function fecharInputBuscaContato()
    {
        setIndicadorInputPesquisaAberto(false);
    }

    function clickBuscarContato()
    {
        console.log("Opa");
    }

    useEffect(() => {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if(e.key === "Escape"){
                fecharInputBuscaContato();
            }
        })
    }, []);

    useEffect(() => {
        inputBuscarRef.current?.focus();
    }, [indicadorInputPesquisaAberto]);

    return (
        <section id='contatosChat'>
            <div id='contatosChat__divTituloEInput'>

                <input
                    type="text"
                    id='contatosChat__inputBuscar'
                    placeholder='Busque um contato'
                    ref={inputBuscarRef}
                    className={`${!indicadorInputPesquisaAberto ? 'displayNone' : ""}`}
                />
                <h3 
                    id='contatosChatTitulo'
                    className={`${indicadorInputPesquisaAberto ? 'displayNone' : ""}`}
                >Contatos</h3>

                <button
                    className='material-symbols-outlined'
                    id='contatosChat__lupaBuscar'
                    onClick={ indicadorInputPesquisaAberto ? clickBuscarContato : clickAbrirInputDeBuscaContato}
                >search</button>
            </div>
            <ul id='contatosChat__listaDeContatos'>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Tiago zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Ervino zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Tiago zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Ervino zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Tiago zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Ervino zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Tiago zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Ervino zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Tiago zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Ervino zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Tiago zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Ervino zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Tiago zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Ervino zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Tiago zay</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato'>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Ervino zay</p>
                </li>
            </ul>

        </section>
    )
}
