import React, { useEffect } from 'react';
import './Comentarios.css';
import { useState } from 'react';
import Comentario from './Comentario';
import InputComentario from './InputComentario';

export default function Comentarios() {
  return (
    <div id='publicacao__areaComentarios'>

      <ul id='publicacao__areaComentarios__comentarios'>

        <Comentario
          perfilUsuario='./imagensDinamicas/perfil.jpg'
          nomeUsuario='Tiago zay'
          comentario='Que maravilha!'
        />

        <Comentario
          perfilUsuario='./imagensDinamicas/perfil2.jpg'
          nomeUsuario='Ervino zay'
          comentario='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem voluptatum, nulla voluptatibus numquam vel nam, fuga quas pariatur architecto aperiam, ipsam minus asperiores aspernatur sit. Facere soluta modi libero eaque?'
        />
      </ul>

      <div id='publicacao__inputNovoComentario'>
        <img src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário" id='inputNovoComentario__perfil' />
        <InputComentario />
      </div>
    </div>
  );
}
