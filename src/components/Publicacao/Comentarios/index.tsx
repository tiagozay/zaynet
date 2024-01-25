import React, { useEffect } from 'react';
import './Comentarios.css';
import { useState } from 'react';
import Comentario from './Comentario';
import InputComentario from './InputComentario';
import UsuarioService from '../../../services/UsuarioService';
import { ComentarioPublicacao } from '../../../models/Publicacao/ComentarioPublicacao';

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

interface ComentariosProps {
  comentarios?: ComentarioPublicacao[] | null
}

export default function Comentarios({ comentarios }: ComentariosProps) {
  return (
    <div id='publicacao__areaComentarios'>

      <ul id='publicacao__areaComentarios__comentarios'>

        {
          comentarios ? comentarios.map(comentario => (
            <Comentario
              perfilUsuario={`${process.env.REACT_APP_CAMINHO_IMAGEM_PERFIL_MINIATURA}${comentario.autor.nomeMiniaturaFotoPerfil}`}
              nomeUsuario={`${comentario.autor.nome} ${comentario.autor.sobrenome}`}
              comentario={comentario.texto}
              curtidas={comentario.curtidas}
              respostas={comentario.respotas}
            />
          )) : ""
        }

{/* 
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
        /> */}
      </ul>

      <div id='publicacao__inputNovoComentario'>
        <img src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()} alt="Perfil usuário" id='inputNovoComentario__perfil' />
        <InputComentario />
      </div>
    </div>
  );
}
