import { ComentarioPublicacao } from "../models/Publicacao/ComentarioPublicacao";
import { ComentarioResposta } from "../models/Publicacao/ComentarioResposta";
import { CurtidaComentario } from "../models/Publicacao/CurtidaComentario";
import { CurtidaPublicacao } from "../models/Publicacao/CurtidaPublicacao";
import { MidiaPublicacaoModel } from "../models/Publicacao/MidiaPublicacaoModel";
import { PublicacaoCompartilhadaModel } from "../models/Publicacao/PublicacaoCompartilhadaModel";
import { PublicacaoModel } from "../models/Publicacao/PublicacaoModel";
import { Usuario } from "../models/Usuario";
import { UsuarioFactory } from "./UsuarioFactory";

export abstract class PublicacaoFactory {
    public static create(objetoPublicacao: any): PublicacaoModel | PublicacaoCompartilhadaModel
    {
        if(objetoPublicacao.indicadorEhUmaPublicacaoCompartilhada){
            return this.createPublicacaoCompartilhada(objetoPublicacao);
        }

        const midiasPublicacao = objetoPublicacao.midiasPublicacao?.map((objetoMidiaPublicacao: any) => PublicacaoFactory.createMidiaPublicacao(objetoMidiaPublicacao));

        const comentariosPublicacao = objetoPublicacao.comentarios.map((objetoComentarioPublicacao: any) => PublicacaoFactory.createComentarioPublicacao(objetoComentarioPublicacao));

        const curtidasPublicacao = objetoPublicacao.curtidas.map((objetoCurtidaPublicacao: any) => PublicacaoFactory.createCurtidaPublicacao(objetoCurtidaPublicacao));

        return new PublicacaoModel(
            objetoPublicacao.id,
            PublicacaoFactory.createAutor(objetoPublicacao.autor),
            objetoPublicacao.texto,
            midiasPublicacao,
            objetoPublicacao.dataDePublicacao,
            objetoPublicacao.quantidadeDeCompartilhamentos,
            comentariosPublicacao,
            curtidasPublicacao
        );
    }

    private static createPublicacaoCompartilhada(objetoPublicacao: any)
    {
        const comentariosPublicacao = objetoPublicacao.comentarios.map((objetoComentarioPublicacao: any) => PublicacaoFactory.createComentarioPublicacao(objetoComentarioPublicacao));

        const curtidasPublicacao = objetoPublicacao.curtidas.map((objetoCurtidaPublicacao: any) => PublicacaoFactory.createCurtidaPublicacao(objetoCurtidaPublicacao));

        return new PublicacaoCompartilhadaModel(
            objetoPublicacao.id,
            this.create(objetoPublicacao.publicacao) as PublicacaoModel,
            PublicacaoFactory.createAutor(objetoPublicacao.autor),
            objetoPublicacao.texto,
            objetoPublicacao.dataDePublicacao,
            comentariosPublicacao,
            curtidasPublicacao
        )
    }

    private static createAutor(objetoAutor: any): Usuario {
        return UsuarioFactory.create(objetoAutor);
    }

    private static createMidiaPublicacao(objetoMidiaPublicacao: any): MidiaPublicacaoModel {
        return new MidiaPublicacaoModel(
            objetoMidiaPublicacao.id,
            objetoMidiaPublicacao.nomeArquivoOriginal,
            objetoMidiaPublicacao.nomeMiniatura
        );
    }

    public static createCurtidaPublicacao(objetoCurtidaPublicacao: any): CurtidaPublicacao {
        const autor = PublicacaoFactory.createAutor(objetoCurtidaPublicacao.autor);

        return new CurtidaPublicacao(
            objetoCurtidaPublicacao.id,
            autor
        );
    }

    public static createComentarioPublicacao(objetoComentarioPublicacao: any): ComentarioPublicacao {

        const autor = PublicacaoFactory.createAutor(objetoComentarioPublicacao.autor);

        const curtidasComentario = objetoComentarioPublicacao.curtidas.map((objetoCurtidaComentario: any) => PublicacaoFactory.createCurtidaComentario(objetoCurtidaComentario));

        const respostasComentario = objetoComentarioPublicacao.respostas.map((objetoRespostaComentario: any) => PublicacaoFactory.createRespostaComentario(objetoRespostaComentario));

        return new ComentarioPublicacao(
            objetoComentarioPublicacao.id,
            objetoComentarioPublicacao.idPublicacao,
            objetoComentarioPublicacao.idAutorPublicacao,
            autor,
            objetoComentarioPublicacao.conteudo,
            curtidasComentario,
            respostasComentario
        )
    }

    private static createCurtidaComentario(objetoCurtidaComentario: any): CurtidaComentario {

        const autor = PublicacaoFactory.createAutor(objetoCurtidaComentario.autor);

        return new CurtidaComentario(
            objetoCurtidaComentario.id,
            autor
        );
    }

    private static createRespostaComentario(objetoRespostaComentario: any): ComentarioResposta {

        const autor = PublicacaoFactory.createAutor(objetoRespostaComentario.autor);

        const curtidasResposta = objetoRespostaComentario.curtidas.map((objetoCurtidaResposta: any) => PublicacaoFactory.createCurtidaComentario(objetoCurtidaResposta));

        return new ComentarioResposta(
            objetoRespostaComentario.id,
            objetoRespostaComentario.idPublicacao,
            objetoRespostaComentario.idAutorPublicacao,
            autor,
            objetoRespostaComentario.conteudo,
            curtidasResposta
        );
    }
}