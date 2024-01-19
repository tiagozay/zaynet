import { NavigateFunction } from "react-router-dom";
import { APIService } from "./APIService";
import { LoginService } from "./LoginService";
import APIResponse from "../Utils/APIResponse";

export default abstract class UsuarioService {
    public static cadastraUsuario(
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
        return APIService.post(
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
                fotoDaCapa
            }
        )
            .then(res => {
                if (res.data && 'dataLogin' in res.data) {
                    return res.data.dataLogin;
                }
            })
            .catch((res) => {

                return res.json()
                    .then((res: APIResponse) => {
                        return Promise.reject(res);
                    } );
            })
    }
}