export class Usuario {
    public id: number;
    public nome: string;
    public sobrenome: string;
    public nomeFotoPerfil: string | null;
    public nomeMiniaturaFotoPerfil: string | null;
    public nomeCapa: string | null;
    public quantidadeDeAmigos: number;
    public dataDeNascimento: Date;
    public genero: string;
    public cidadeNatal: string;
    public cidadeAtual: string;
    public statusDeRelacionamento: string;

    constructor(
        id: number,
        nome: string,
        sobrenome: string,
        quantidadeDeAmigos: number,
        nomeFotoPerfil: string | null,
        nomeMiniaturaFotoPerfil: string | null,
        nomeCapa: string | null,
        dataDeNascimento: Date,
        genero: string,
        cidadeNatal: string,
        cidadeAtual: string,
        statusDeRelacionamento: string,
    ) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.nomeFotoPerfil = nomeFotoPerfil;
        this.nomeMiniaturaFotoPerfil = nomeMiniaturaFotoPerfil;
        this.nomeCapa = nomeCapa;
        this.quantidadeDeAmigos = quantidadeDeAmigos;
        this.dataDeNascimento = dataDeNascimento;
        this.genero = genero;
        this.cidadeNatal = cidadeNatal;
        this.cidadeAtual = cidadeAtual;
        this.statusDeRelacionamento = statusDeRelacionamento
    }
}