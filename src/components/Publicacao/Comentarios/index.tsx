import React, { useEffect } from 'react';
import './Comentarios.css';
import { useState } from 'react';
import Comentario from './Comentario';
import InputComentario from './InputComentario';
import UsuarioService from '../../../services/UsuarioService';
import { ComentarioPublicacao } from '../../../models/Publicacao/ComentarioPublicacao';
import { APIService } from '../../../services/APIService';
import { PublicacaoFactory } from '../../../services/PublicacaoFactory';
import { useLocation, useNavigate } from 'react-router-dom';

interface ComentariosProps {
  idAutorPublicacao: number,
  comentariosPublicacao?: ComentarioPublicacao[] | null,
  setQuantidadeDeComentarios: React.Dispatch<React.SetStateAction<number>>,
  idPublicacao: number,
  btnComentarRef: React.MutableRefObject<null>
}

export default function Comentarios({ idAutorPublicacao, comentariosPublicacao, setQuantidadeDeComentarios, idPublicacao, btnComentarRef }: ComentariosProps) {

  const navigate = useNavigate();

  const location = useLocation();

  const [novoComentarioDigitado, setNovoComentarioDigitado] = useState("");

  const [comentarios, setComentarios] = useState(comentariosPublicacao);

  function buscaComentariosDaPublicacao() {
    APIService.get(`publicacoes/${idPublicacao}/comentarios`)
      .then(res => {

        const comentarios = res.data?.map((objetoComentario: any) => {
          return PublicacaoFactory.createComentarioPublicacao(objetoComentario);
        });

        setComentarios(comentarios);
        setQuantidadeDeComentarios(comentarios.length)
      });

  }

  function enviarNovoComentario() {
    APIService.post(
      'comentarios',
      {
        idPublicacao,
        conteudo: novoComentarioDigitado
      }
    )
      .then(res => {
        setNovoComentarioDigitado("");
        buscaComentariosDaPublicacao();
      });
  }

  function clickPerfilUsuario() {
    //Antes de re-direcionar, verifica se já não está nesse perfil. Se sim, não faz nada.
    if (location.pathname !== `/perfil/${idAutorPublicacao}`) {
      navigate(`/perfil/${idAutorPublicacao}`);
    }
  }

  return (
    <div id='publicacao__areaComentarios'>

      <ul id='publicacao__areaComentarios__comentarios'>
        {
          comentarios ? comentarios.map(comentario => (
            <Comentario
              key={comentario.id}
              comentario={comentario}
              atualizaComentarios={buscaComentariosDaPublicacao}
            />
          )) : ""
        }
      </ul>

      <div id='publicacao__inputNovoComentario'>
        <img
          src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
          alt="Perfil usuário"
          id='inputNovoComentario__perfil'
          onClick={clickPerfilUsuario}
        />
        <InputComentario
          novoComentarioDigitado={novoComentarioDigitado}
          setNovoComentarioDigitado={setNovoComentarioDigitado}
          clickEnviarComentario={enviarNovoComentario}
          ref={btnComentarRef}
        />
      </div>
    </div>
  );
}
