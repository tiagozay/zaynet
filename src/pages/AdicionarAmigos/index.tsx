import React from 'react';
import './AdicionarAmigos.css';
import PessoaParaAdicionar from './PessoaParaAdicionar';

export default function AdicionarAmigos() {
  return (
    <section id="adicionarAmigosPage">
      <div id='adicionarAmigosPage__container'>
        <h3 id='adicionarAmigosPage__titulo'>Adicionar amigos</h3>
        <ul id='adicionarAmigosPage__listaPessoas'>
          <PessoaParaAdicionar
            perfil='./imagensDinamicas/perfil2.jpg'
            nome='Maria almeida'
            amigosEmComum={89}
          />
          <PessoaParaAdicionar
            perfil='./imagensDinamicas/perfil.jpg'
            nome='Pedro souza'
            amigosEmComum={105}
          />
          <PessoaParaAdicionar
            perfil='./imagensDinamicas/perfil2.jpg'
            nome='Maria almeida'
            amigosEmComum={89}
          />
          <PessoaParaAdicionar
            perfil='./imagensDinamicas/perfil.jpg'
            nome='Pedro souza'
            amigosEmComum={105}
          />
              <PessoaParaAdicionar
            perfil='./imagensDinamicas/perfil.jpg'
            nome='Pedro souza'
            amigosEmComum={105}
          />
          <PessoaParaAdicionar
            perfil='./imagensDinamicas/perfil2.jpg'
            nome='Maria almeida'
            amigosEmComum={89}
          />
          <PessoaParaAdicionar
            perfil='./imagensDinamicas/perfil2.jpg'
            nome='Maria almeida'
            amigosEmComum={89}
          />
          <PessoaParaAdicionar
            perfil='./imagensDinamicas/perfil.jpg'
            nome='Pedro souza'
            amigosEmComum={105}
          />
          <PessoaParaAdicionar
            perfil='./imagensDinamicas/perfil2.jpg'
            nome='Maria almeida'
            amigosEmComum={89}
          />
          <PessoaParaAdicionar
            perfil='./imagensDinamicas/perfil.jpg'
            nome='Pedro souza'
            amigosEmComum={105}
          />
              <PessoaParaAdicionar
            perfil='./imagensDinamicas/perfil.jpg'
            nome='Pedro souza'
            amigosEmComum={105}
          />
          <PessoaParaAdicionar
            perfil='./imagensDinamicas/perfil2.jpg'
            nome='Maria almeida'
            amigosEmComum={89}
          />
        </ul>
      </div>
    </section>
  )
}
