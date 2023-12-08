import React, { useEffect } from 'react';
import './Comentarios.css';
import { useState } from 'react';
import Comentario from './Comentario';
import InputComentario from './InputComentario';

// class ComentarioOBJ{
//   public perfilUsuario: string;
//   public nomeUsuario: string;
//   public comentario: string;

//   constructor(
//     perfilUsuario: string,
//     nomeUsuario: string,
//     comentario: string,
//   )
//   {
//     this.perfilUsuario = perfilUsuario;
//     this.nomeUsuario = nomeUsuario;
//     this.comentario = comentario;
//   }
// }


export default function Comentarios() {
  return (
    <div id='publicacao__areaComentarios'>

      <ul id='publicacao__areaComentarios__comentarios'>

        <Comentario
          perfilUsuario='./imagensDinamicas/perfil.jpg'
          nomeUsuario='Pedro souza'
          comentario='Que maravilha!'
          respostas={[
            {
              perfilUsuario: './imagensDinamicas/perfil2.jpg',
              nomeUsuario: 'Maria almeida',
              comentario: 'É verdade!',
            }
          ]}
        />

        <Comentario
          perfilUsuario='./imagensDinamicas/perfil2.jpg'
          nomeUsuario='Maria almeida'
          comentario='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem voluptatum, nulla voluptatibus numquam vel nam, fuga quas pariatur architecto aperiam, ipsam minus asperiores aspernatur sit. Facere soluta modi libero eaque?'
          respostas={[
            {
              perfilUsuario: './imagensDinamicas/perfil.jpg',
              nomeUsuario: 'Pedro souza',
              comentario: 'Que lagal!',
            },
            {
              perfilUsuario: './imagensDinamicas/perfil2.jpg',
              nomeUsuario: 'Maria almeida',
              comentario: 'Sim, muito!',
            },
          ]}
        />
      </ul>

      <div id='publicacao__inputNovoComentario'>
        <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='inputNovoComentario__perfil' />
        <InputComentario />
      </div>
    </div>
  );
}
