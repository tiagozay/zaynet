export class ConversaModel
{
    public nomeAutor: string;
    public perfilAutor: string;
    public vistoPorUltimo: string;
    public mensagens: Array<MensagemRecebida | MensagemEnviada> 

    constructor(
        nomeAutor: string,
        perfilAutor: string,
        vistoPorUltimo: string,
        mensagens: Array<MensagemRecebida | MensagemEnviada> 
    )
    {
        this.nomeAutor = nomeAutor;
        this.perfilAutor = perfilAutor;
        this.vistoPorUltimo = vistoPorUltimo;
        this.mensagens = mensagens;
    }
}

export class MensagemRecebida {
    public perfilAutor: string;
    public mensagem: string;

    constructor(perfilAutor: string, mensagem: string)
    {
        this.perfilAutor = perfilAutor;
        this.mensagem = mensagem;
    }
}

export class MensagemEnviada {
    public perfilAutor: string;
    public mensagem: string;

    constructor(perfilAutor: string, mensagem: string)
    {
        this.perfilAutor = perfilAutor;
        this.mensagem = mensagem;
    }
}