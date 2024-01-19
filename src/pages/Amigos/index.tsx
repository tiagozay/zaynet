import React from 'react';
import './Amigos.css';
import UsuarioService from '../../services/UsuarioService';

export default function Amigos() {
    return (
        <section id="amigosPage">
            <div id='amigosPage__container'>
                <h3 id='amigosPage__titulo'>Amigos</h3>
                <ul id='amigosPage__listaAmigos'>
                    <li id='amigosPage__amigo'>
                        <img src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()} alt="Perfil do usuário" id='amigo__perfil'/>
                        <div id='amigo__informacoesAmigo'>
                            <p id='amigo__informacoesAmigo__nome'>Pedro souza</p>
                            <p id='amigo__informacoesAmigo__amigosEmComum'>105 amigos em comum</p>
                        </div>
                    </li>
                    <li id='amigosPage__amigo'>
                        <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil do usuário" id='amigo__perfil'/>
                        <div id='amigo__informacoesAmigo'>
                            <p id='amigo__informacoesAmigo__nome'>Maria almeida</p>
                            <p id='amigo__informacoesAmigo__amigosEmComum'>89 amigos em comum</p>
                        </div>
                    </li>
                    <li id='amigosPage__amigo'>
                        <img src="./imagensDinamicas/perfil2.jpg" alt="Perfil do usuário" id='amigo__perfil'/>
                        <div id='amigo__informacoesAmigo'>
                            <p id='amigo__informacoesAmigo__nome'>Maria almeida</p>
                            <p id='amigo__informacoesAmigo__amigosEmComum'>89 amigos em comum</p>
                        </div>
                    </li>
                    <li id='amigosPage__amigo'>
                        <img src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()} alt="Perfil do usuário" id='amigo__perfil'/>
                        <div id='amigo__informacoesAmigo'>
                            <p id='amigo__informacoesAmigo__nome'>Pedro souza</p>
                            <p id='amigo__informacoesAmigo__amigosEmComum'>105 amigos em comum</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}
