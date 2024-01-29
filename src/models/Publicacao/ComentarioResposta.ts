import { Usuario } from "../Usuario";
import { CurtidaComentario } from "./CurtidaComentario";

export class ComentarioResposta {
    public id: number;
    public idPublicacao: number;
    public idAutorPublicacao: number;
    public autor: Usuario;
    public texto: string;
    public curtidas: CurtidaComentario[] | null;

    constructor(
        id: number,
        idPublicacao: number,
        idAutorPublicacao: number,
        autor: Usuario,
        texto: string,
        curtidas: CurtidaComentario[] | null
    ) {
        this.id = id;
        this.idPublicacao = idPublicacao;
        this.idAutorPublicacao = idAutorPublicacao;
        this.autor = autor;
        this.texto = texto;
        this.curtidas = curtidas;
    }
}