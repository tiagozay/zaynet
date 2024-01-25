import { text } from "stream/consumers";
import { MidiaPublicacaoModel } from "./MidiaPublicacaoModel";
import { Usuario } from "../Usuario";
import { CurtidaComentario } from "./CurtidaComentario";
import { ComentarioResposta } from "./ComentarioResposta";

export class ComentarioPublicacao {
    public id: number;
    public autor: Usuario;
    public texto: string
    public curtidas: CurtidaComentario[] | null;
    public respotas: ComentarioResposta[] | null;

    constructor(
        id: number,
        autor: Usuario,
        texto: string,
        curtidas: CurtidaComentario[] | null,
        respotas: ComentarioResposta[] | null
    ) {
        this.id = id;
        this.autor = autor;
        this.texto = texto;
        this.curtidas = curtidas;
        this.respotas = respotas;
    }
}