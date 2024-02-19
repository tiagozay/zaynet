import { NavigateFunction } from "react-router-dom";
import { APIService } from "./APIService";
import { LoginService } from "./LoginService";
import APIResponse from "../Utils/APIResponse";
import { ArquivosPublicacaoService } from "./ArquivosPublicacaoService";

export default abstract class UsuarioService {
    public static async cadastraUsuario(
        nome: string,
        sobrenome: string,
        email: string,
        senha: string,
        dataDeNascimento: string,
        genero: string,
        cidadeNatal: string,
        cidadeAtual: string,
        statusDeRelacionamento: string,
        fotoDoPerfil: File | null,
        fotoDaCapa: File | null,
    ) {

        let miniaturaFotoDoPerfil: null | File = null;   

        if (fotoDoPerfil) {
            miniaturaFotoDoPerfil = await ArquivosPublicacaoService.diminuiTamanhoDeImagem(60, fotoDoPerfil);
        }

        try {
            const res = await APIService.post(
                'usuarios',
                {
                    nome,
                    sobrenome,
                    email,
                    senha,
                    dataDeNascimento,
                    genero,
                    cidadeNatal,
                    cidadeAtual,
                    statusDeRelacionamento,
                    fotoDoPerfil,
                    miniaturaFotoDoPerfil,
                    fotoDaCapa,
                }
            );

            if (res.data && 'dataLogin' in res.data) {
                return res.data.dataLogin;
            }
        } catch (res: any) {
            return res.json()
                .then((res: APIResponse) => {
                    return Promise.reject(res);
                });
        }
    }

    public static obtemIdUsuarioLogado(): number
    {
        const usuario = LoginService.buscaUsuarioLogado();

        return Number(usuario.id);
    }

    public static obtemNomeDoUsuarioLogado() {
        const usuario = LoginService.buscaUsuarioLogado();

        return usuario.nome;
    }

    public static obtemNomeCompletoDoUsuarioLogado() {
        const usuario = LoginService.buscaUsuarioLogado();

        return `${usuario.nome} ${usuario.sobrenome}`;
    }

    public static obtemMiniaturaPerfilDoUsuarioLogado() {
        const usuario = LoginService.buscaUsuarioLogado();

        const nomeMiniaturaFotoPerfil = usuario.nomeMiniaturaFotoPerfil;

        if(nomeMiniaturaFotoPerfil){
            return `${process.env.REACT_APP_CAMINHO_IMAGEM_PERFIL_MINIATURA}${nomeMiniaturaFotoPerfil}`;
        }else{
            return `${process.env.REACT_APP_CAMINHO_IMAGEM_SEM_PERFIL}`;
        }
    
    }
}