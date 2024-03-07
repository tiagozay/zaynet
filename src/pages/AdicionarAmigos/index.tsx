import React, { useEffect, useState } from 'react';
import './AdicionarAmigos.css';
import PessoaParaAdicionar from './PessoaParaAdicionar';
import { Usuario } from '../../models/Usuario';
import { APIService } from '../../services/APIService';
import { UsuarioFactory } from '../../services/UsuarioFactory';
import UsuarioService from '../../services/UsuarioService';

export default function AdicionarAmigos() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    APIService.get('usuariosNaoAmigos')
      .then(res => {

        if (!res.data) {
          return;
        }

        const objetosUsuarios = res.data;

        const usuarios = objetosUsuarios.map((objetoUsuario: any) => UsuarioFactory.create(objetoUsuario))

        setUsuarios(usuarios);

      })
  }, []);

  function clickAdicionarAmigo(id: number) {
    APIService.post(`usuarios/solicitacaoDeAmizade/${id}`, {})
      .catch(() => { });
  }

  return (
    <section id="adicionarAmigosPage">
      <div id='adicionarAmigosPage__container'>
        <h3 id='adicionarAmigosPage__titulo'>Adicionar amigos</h3>
        <ul id='adicionarAmigosPage__listaPessoas'>
          {
            usuarios.map(usuario => {
              return <PessoaParaAdicionar
                key={usuario.id}
                id={usuario.id}
                perfil={UsuarioService.obtemCaminhoCompletoDoPerfilMiniaturaDoUsuarioRecebido(usuario)}
                nome={`${usuario.nome} ${usuario.sobrenome}`}
                amigosEmComum={89}
                clickAdicionarAmigo={clickAdicionarAmigo}
              />
            })
          }
        </ul>
      </div>
    </section>
  )
}
