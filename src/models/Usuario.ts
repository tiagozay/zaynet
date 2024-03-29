import { Amigo } from "./Amigo";
import { Conta } from "./Conta";

export class Usuario extends Conta{
    public amigos: Array<Amigo>;

    constructor(
        id: number,
        nome: string,
        sobrenome: string,
        nomeFotoPerfil: string | null,
        nomeMiniaturaFotoPerfil: string | null,
        nomeCapa: string | null,
        dataDeNascimento: Date,
        genero: string,
        cidadeNatal: string,
        cidadeAtual: string,
        statusDeRelacionamento: string,
        amigos: Array<Amigo>
    ) {
        super(id, nome, sobrenome, nomeFotoPerfil, nomeMiniaturaFotoPerfil, nomeCapa, dataDeNascimento, genero, cidadeNatal, cidadeAtual, statusDeRelacionamento);
        this.amigos = amigos;
    }
}