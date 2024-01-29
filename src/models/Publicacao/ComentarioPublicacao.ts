import { text } from "stream/consumers";
import { MidiaPublicacaoModel } from "./MidiaPublicacaoModel";
import { Usuario } from "../Usuario";
import { CurtidaComentario } from "./CurtidaComentario";
import { ComentarioResposta } from "./ComentarioResposta";

export class ComentarioPublicacao {
    public id: number;
    public idPublicacao: number;
    public idAutorPublicacao: number;
    public autor: Usuario;
    public texto: string
    public curtidas: CurtidaComentario[] | null;
    public respotas: ComentarioResposta[] | null;

    constructor(
        id: number,
        idPublicacao: number,
        idAutorPublicacao: number,
        autor: Usuario,
        texto: string,
        curtidas: CurtidaComentario[] | null,
        respotas: ComentarioResposta[] | null
    ) {
        this.id = id;
        this.idPublicacao = idPublicacao;
        this.idAutorPublicacao = idAutorPublicacao;
        this.autor = autor;
        this.texto = texto;
        this.curtidas = curtidas;
        this.respotas = respotas;
    }
}