export class Usuario {
    public id: number;
    public nome: string;
    public sobrenome: string;
    public nomeFotoPerfil: string | null;
    public nomeMiniaturaFotoPerfil: string | null;
    public nomeCapa: string | null;
    public quantidadeDeAmigos: number;
    public indicadorEhAmigo: boolean;
    public indicadorSolicitacaoDeAmizadeRecebida: boolean;
    public indicadorUsuarioQuemEnviouASolicitacao: boolean;

    constructor(
        id: number,
        nome: string,
        sobrenome: string,
        quantidadeDeAmigos: number,
        indicadorEhAmigo: boolean,
        indicadorSolicitacaoDeAmizadeRecebida: boolean,
        indicadorUsuarioQuemEnviouASolicitacao: boolean,
        nomeFotoPerfil: string | null,
        nomeMiniaturaFotoPerfil: string | null,
        nomeCapa: string | null
    ) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.nomeFotoPerfil = nomeFotoPerfil;
        this.nomeMiniaturaFotoPerfil = nomeMiniaturaFotoPerfil;
        this.nomeCapa = nomeCapa;
        this.quantidadeDeAmigos = quantidadeDeAmigos;
        this.indicadorEhAmigo = indicadorEhAmigo;
        this.indicadorSolicitacaoDeAmizadeRecebida = indicadorSolicitacaoDeAmizadeRecebida;
        this.indicadorUsuarioQuemEnviouASolicitacao = indicadorUsuarioQuemEnviouASolicitacao;
    }
}