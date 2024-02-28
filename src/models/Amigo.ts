import { Conta } from "./Conta";

export class Amigo extends Conta{
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
    ) {
        super(id, nome, sobrenome, nomeFotoPerfil, nomeMiniaturaFotoPerfil, nomeCapa, dataDeNascimento, genero, cidadeNatal, cidadeAtual, statusDeRelacionamento);
    }
}