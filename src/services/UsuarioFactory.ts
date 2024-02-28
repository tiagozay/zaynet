import { Amigo } from "../models/Amigo";
import { Usuario } from "../models/Usuario";

export abstract class UsuarioFactory {
    public static create(objetoUsuario: any): Usuario {
        const amigos = objetoUsuario.amigos.map((objetoAmigo: any) => {
            return new Amigo(
                objetoAmigo.id,
                objetoAmigo.nome,
                objetoAmigo.sobrenome,
                objetoAmigo.nomeFotoPerfil,
                objetoAmigo.nomeMiniaturaFotoPerfil,
                objetoAmigo.nomeFotoCapa,
                objetoAmigo.dataDeNascimento,
                objetoAmigo.genero,
                objetoAmigo.cidadeNatal,
                objetoAmigo.cidadeAtual,
                objetoAmigo.statusDeRelacionamento
            );
        })

        return new Usuario(
            objetoUsuario.id,
            objetoUsuario.nome,
            objetoUsuario.sobrenome,
            objetoUsuario.nomeFotoPerfil,
            objetoUsuario.nomeMiniaturaFotoPerfil,
            objetoUsuario.nomeFotoCapa,
            objetoUsuario.dataDeNascimento,
            objetoUsuario.genero,
            objetoUsuario.cidadeNatal,
            objetoUsuario.cidadeAtual,
            objetoUsuario.statusDeRelacionamento,
            amigos
        );
    }
}