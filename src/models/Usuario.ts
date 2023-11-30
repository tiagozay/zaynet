export class Usuario {
    public id: number;
    public nome: string;
    public quantidadeDeAmigos: number;
    public indicadorEhAmigo: boolean;
    public indicadorSolicitacaoDeAmizadeRecebida: boolean;
    public indicadorUsuarioQuemEnviouASolicitacao: boolean;

    constructor(
        id: number,
        nome: string,
        quantidadeDeAmigos: number,
        indicadorEhAmigo: boolean,
        indicadorSolicitacaoDeAmizadeRecebida: boolean,
        indicadorUsuarioQuemEnviouASolicitacao: boolean
    ) {
        this.id = id;
        this.nome = nome;
        this.quantidadeDeAmigos = quantidadeDeAmigos;
        this.indicadorEhAmigo = indicadorEhAmigo;
        this.indicadorSolicitacaoDeAmizadeRecebida = indicadorSolicitacaoDeAmizadeRecebida;
        this.indicadorUsuarioQuemEnviouASolicitacao = indicadorUsuarioQuemEnviouASolicitacao;
    }
}