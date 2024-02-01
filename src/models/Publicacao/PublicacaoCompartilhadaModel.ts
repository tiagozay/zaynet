import { MidiaPublicacaoModel } from "./MidiaPublicacaoModel";
import { Usuario } from "../Usuario";
import { ComentarioPublicacao } from "./ComentarioPublicacao";
import { CurtidaPublicacao } from "./CurtidaPublicacao";
import { PublicacaoModel } from "./PublicacaoModel";

export class PublicacaoCompartilhadaModel {
    public id: number;
    public publicacao: PublicacaoModel;
    public autor: Usuario;
    public texto: string | null;
    public dataDePublicacao: string;
    public comentarios: ComentarioPublicacao[] | null;
    public curtidas: CurtidaPublicacao[] | null;

    constructor(
        id: number,
        publicacao: PublicacaoModel,
        autor: Usuario,
        texto: string | null,
        dataDePublicacao: string,
        comentarios: ComentarioPublicacao[] | null,
        curtidas: CurtidaPublicacao[] | null
    ) {
        this.id = id;
        this.publicacao = publicacao;
        this.autor = autor;
        this.texto = texto;
        this.dataDePublicacao = dataDePublicacao;
        this.comentarios = comentarios;
        this.curtidas = curtidas;
    }
}