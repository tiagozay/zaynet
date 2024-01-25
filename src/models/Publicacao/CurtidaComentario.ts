import { text } from "stream/consumers";
import { MidiaPublicacaoModel } from "./MidiaPublicacaoModel";
import { Usuario } from "../Usuario";

export class CurtidaComentario {
    public id: number;
    public autor: Usuario;

    constructor(
        id: number,
        autor: Usuario,
    ) {
        this.id = id;
        this.autor = autor;
    }
}