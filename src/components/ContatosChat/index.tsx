import React, { useRef, useState, useEffect, useContext } from 'react';
import './ContatosChat.css';
import { CaixaDeMensagemContext } from '../../contexts/CaixaDeMensagemContext';
import { ConversaModel, MensagemEnviada, MensagemRecebida } from '../../models/ConversaModel';

export default function ContatosChat() {

    const conversa1 = new ConversaModel(
        'Maria Almeida',
        './imagensDinamicas/perfil2.jpg',
        '10 minutos',
        [
            new MensagemRecebida(
                './imagensDinamicas/perfil2.jpg',
                'Bom dia Pedro!'
            ),
            new MensagemEnviada(
                './imagensDinamicas/perfil.jpg',
                'Bom dia Maria!'
            ),
        ]
    );

    const conversa2 = new ConversaModel(
        'Pedro souza',
        './imagensDinamicas/perfil.jpg',
        '1 hora',
        [
            new MensagemRecebida(
                './imagensDinamicas/perfil.jpg',
                'Bom dia Maria'
            ),
            new MensagemEnviada(
                './imagensDinamicas/perfil2.jpg',
                'Bom dia Pedro'
            ),
            new MensagemRecebida(
                './imagensDinamicas/perfil.jpg',
                'É você que está vendendo um carro?'
            ),
            new MensagemEnviada(
                './imagensDinamicas/perfil2.jpg',
                'Sim sou eu mesma.'
            ),
        ]
    );

    const {
        abrirChat
    } = useContext(CaixaDeMensagemContext);

    const [indicadorInputPesquisaAberto, setIndicadorInputPesquisaAberto] = useState(false);

    const inputBuscarRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                fecharInputBuscaContato();
            }
        })
    }, []);

    useEffect(() => {
        inputBuscarRef.current?.focus();
    }, [indicadorInputPesquisaAberto]);

    function clickAbrirInputDeBuscaContato() {
        setIndicadorInputPesquisaAberto(true);
    }

    function fecharInputBuscaContato() {
        setIndicadorInputPesquisaAberto(false);
    }

    function clickBuscarContato() {
        console.log("Opa");
    }

    function clickEmAlgumContato(conversa: ConversaModel) {
        abrirChat(conversa);
    }

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
                    onClick={indicadorInputPesquisaAberto ? clickBuscarContato : clickAbrirInputDeBuscaContato}
                >search</button>
            </div>
            <ul id='contatosChat__listaDeContatos'>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa2)}>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Pedro souza</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa1)}>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Maria almeida</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa2)}>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Pedro souza</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa1)}>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Maria almeida</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa2)}>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Pedro souza</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa1)}>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Maria almeida</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa2)}>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Pedro souza</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa1)}>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Maria almeida</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa2)}>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Pedro souza</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa1)}>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Maria almeida</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa2)}>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Pedro souza</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa1)}>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Maria almeida</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa2)}>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Pedro souza</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa1)}>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Maria almeida</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa2)}>
                    <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Pedro souza</p>
                </li>
                <li className='contatosChat__listaDeContatos__contato' onClick={() => clickEmAlgumContato(conversa1)}>
                    <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário" id='contatosChat__perfilContato' />
                    <p id='contatosChat__nomeContato'>Maria almeida</p>
                </li>
            </ul>

        </section>
    )
}
