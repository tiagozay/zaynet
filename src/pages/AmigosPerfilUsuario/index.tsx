import React from 'react';
import './AmigosPerfilUsuario.css';

export default function AmigosPerfilUsuario() {
  return (
    <section id="amigosPerfilDoUsuario__page">
      <h3 id="amigosPerfilDoUsuario__titulo">Amigos</h3>
      <ul id='amigosPerfilDoUsuario__listaDeAmigos'>
        <li className='amigosPerfilDoUsuario__listaDeAmigos__amigo'> 
          <img 
            src="./../imagensDinamicas/perfil.jpg" 
            alt="Perfil usuario" 
            className='amigosPerfilDoUsuario__listaDeAmigos__amigo__perfil'
          />
          <div>
            <p className='amigosPerfilDoUsuario__listaDeAmigos__amigo__nome'>Pedro almeida</p>
            <p className='amigosPerfilDoUsuario__listaDeAmigos__amigo__amigosEmComum'>110 amigos em comum</p>
          </div>
        </li>
        <li className='amigosPerfilDoUsuario__listaDeAmigos__amigo'> 
          <img 
            src="./../imagensDinamicas/perfil2.jpg" 
            alt="Perfil usuario" 
            className='amigosPerfilDoUsuario__listaDeAmigos__amigo__perfil'
          />
          <div>
            <p className='amigosPerfilDoUsuario__listaDeAmigos__amigo__nome'>Cristina souza</p>
            <p className='amigosPerfilDoUsuario__listaDeAmigos__amigo__amigosEmComum'>96 amigos em comum</p>
          </div>
        </li>
        <li className='amigosPerfilDoUsuario__listaDeAmigos__amigo'> 
          <img 
            src="./../imagensDinamicas/perfil2.jpg" 
            alt="Perfil usuario" 
            className='amigosPerfilDoUsuario__listaDeAmigos__amigo__perfil'
          />
          <div>
            <p className='amigosPerfilDoUsuario__listaDeAmigos__amigo__nome'>Maria de andrade</p>
            <p className='amigosPerfilDoUsuario__listaDeAmigos__amigo__amigosEmComum'>120 amigos em comum</p>
          </div>
        </li>
        <li className='amigosPerfilDoUsuario__listaDeAmigos__amigo'> 
          <img 
            src="./../imagensDinamicas/perfil.jpg" 
            alt="Perfil usuario" 
            className='amigosPerfilDoUsuario__listaDeAmigos__amigo__perfil'
          />
          <div>
            <p className='amigosPerfilDoUsuario__listaDeAmigos__amigo__nome'>André souza</p>
            <p className='amigosPerfilDoUsuario__listaDeAmigos__amigo__amigosEmComum'>12 amigos em comum</p>
          </div>
        </li>
      </ul>
    </section>
  )
}
