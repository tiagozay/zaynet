import React, { useEffect } from 'react';
import './Comentarios.css';
import { useState } from 'react';
import Comentario from './Comentario';
import InputComentario from './InputComentario';
import UsuarioService from '../../../services/UsuarioService';
import { ComentarioPublicacao } from '../../../models/Publicacao/ComentarioPublicacao';
import { APIService } from '../../../services/APIService';

interface ComentariosProps {
  comentarios?: ComentarioPublicacao[] | null,
  idPublicacao: number,
}

export default function Comentarios({ comentarios, idPublicacao }: ComentariosProps) {

  const [novoComentarioDigitado, setNovoComentarioDigitado] = useState("");

  function enviarNovoComentario() {
    APIService.post(
      'publicacoes/comentarios',
      {
        idPublicacao,
        conteudo: novoComentarioDigitado
      }
    )
      .then(res => {
        setNovoComentarioDigitado("");
      });
  }

  return (
    <div id='publicacao__areaComentarios'>

      <ul id='publicacao__areaComentarios__comentarios'>
        {
          comentarios ? comentarios.map(comentario => (
            <Comentario
              key={comentario.id}
              perfilUsuario={`${process.env.REACT_APP_CAMINHO_IMAGEM_PERFIL_MINIATURA}${comentario.autor.nomeMiniaturaFotoPerfil}`}
              nomeUsuario={`${comentario.autor.nome} ${comentario.autor.sobrenome}`}
              comentario={comentario.texto}
              curtidas={comentario.curtidas}
              respostas={comentario.respotas}
            />
          )) : ""
        }
      </ul>

      <div id='publicacao__inputNovoComentario'>
        <img src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()} alt="Perfil usuário" id='inputNovoComentario__perfil' />
        <InputComentario
          novoComentarioDigitado={novoComentarioDigitado}
          setNovoComentarioDigitado={setNovoComentarioDigitado}
          clickEnviarComentario={enviarNovoComentario}
        />
      </div>
    </div>
  );
}
