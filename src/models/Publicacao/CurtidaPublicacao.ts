import { text } from "stream/consumers";
import { MidiaPublicacaoModel } from "./MidiaPublicacaoModel";
import { Usuario } from "../Usuario";

export class CurtidaPublicacao {
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