import { Usuario } from "../models/Usuario";

export abstract class UsuarioFactory {
    public static create(objetoUsuario: any): Usuario {
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
            objetoUsuario.statusDeRelacionamento
        );
    }
}