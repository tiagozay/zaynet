import secureLocalStorage from "react-secure-storage";
import { APIService } from "./APIService";

interface InforUsuarioLogado {
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    dataDeNascimento: object;
    genero: string;
    cidadeNatal: string;
    cidadeAtual: string;
    statusDeRelacionamento: string;
    caminhoFotoPerfil?: string;
    caminhoFotoCapa?: string;
}

export abstract class LoginService {
    public static armazenaInfoLogin(token: string, usuario: object) {
        secureLocalStorage.clear();
        secureLocalStorage.setItem('token', token);
        secureLocalStorage.setItem('usuario', usuario);
    }

    //Função utliizada por toda a aplicação para verificar se existe um login valido no sistema
    public static verificaSeHaLoginValido() : Promise<boolean>
    {
        return new Promise((resolve) => {
            const token = secureLocalStorage.getItem("token");

            if (!token) {
                resolve(false);
            }

            const usuario = secureLocalStorage.getItem("usuario");

            if (!usuario) {
                resolve(false);
            }

            APIService.post('verificaLogin', {})
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }

    public static buscaTokenArmazenado(): string {
        return secureLocalStorage.getItem("token") as string;
    }

    public static buscaUsuarioLogado(): InforUsuarioLogado {
        return secureLocalStorage.getItem("usuario") as InforUsuarioLogado;
    }
} 