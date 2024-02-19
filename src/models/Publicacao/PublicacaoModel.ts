import { MidiaPublicacaoModel } from "./MidiaPublicacaoModel";
import { Usuario } from "../Usuario";
import { ComentarioPublicacao } from "./ComentarioPublicacao";
import { CurtidaPublicacao } from "./CurtidaPublicacao";

export class PublicacaoModel {
    public id: number;
    public autor: Usuario;
    public texto: string | null;
    public midiasPublicacao: MidiaPublicacaoModel[];
    public dataDePublicacao: string;
    public quantidadeDeCompartilhamentos: number;
    public comentarios: ComentarioPublicacao[];
    public curtidas: CurtidaPublicacao[];

    constructor(
        id: number,
        autor: Usuario,
        texto: string | null,
        midiasPublicacao: MidiaPublicacaoModel[],
        dataDePublicacao: string,
        quantidadeDeCompartilhamentos: number,
        comentarios: ComentarioPublicacao[],
        curtidas: CurtidaPublicacao[]
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