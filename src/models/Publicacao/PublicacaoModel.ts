import { MidiaPublicacaoModel } from "./MidiaPublicacaoModel";
import { Usuario } from "../Usuario";
import { ComentarioPublicacao } from "./ComentarioPublicacao";
import { CurtidaPublicacao } from "./CurtidaPublicacao";

export class PublicacaoModel {
    public id: number;
    public autor: Usuario;
    public texto: string | null;
    public midiasPublicacao: MidiaPublicacaoModel[] | null;
    public dataDePublicacao: string;
    public quantidadeDeCompartilhamentos: number;
    public comentarios: ComentarioPublicacao[] | null;
    public curtidas: CurtidaPublicacao[] | null;

    constructor(
        id: number,
        autor: Usuario,
        texto: string | null,
        midiasPublicacao: MidiaPublicacaoModel[] | null,
        dataDePublicacao: string,
        quantidadeDeCompartilhamentos: number,
        comentarios: ComentarioPublicacao[] | null,
        curtidas: CurtidaPublicacao[] | null
    ) {
        this.id = id;
        this.autor = autor;
        this.texto = texto;
        this.midiasPublicacao = midiasPublicacao;
        this.dataDePublicacao = dataDePublicacao;
        this.quantidadeDeCompartilhamentos = quantidadeDeCompartilhamentos;
        this.comentarios = comentarios;
        this.curtidas = curtidas;
    }
}