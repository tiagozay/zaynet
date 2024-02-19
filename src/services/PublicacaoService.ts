import { PublicacaoCompartilhadaModel } from "../models/Publicacao/PublicacaoCompartilhadaModel";
import { PublicacaoModel } from "../models/Publicacao/PublicacaoModel";
import { APIService } from "./APIService";
import { ArquivosPublicacaoService } from "./ArquivosPublicacaoService";

export abstract class PublicacaoService {
    public static async publicar(texto: string | null, arquivosSelecionados: FileList | null) {
        let arquivosBase64 = null;

        if (arquivosSelecionados) {

            //Se houve alguma mídia selecionada, chama a função processaImagensEVideosRecebidosDoUsuario que diminui o tamanho da imagem para gerar sua miniatura e no caso dos vídeos, obtem a miniatura(imagem) do vídeo, retornando no then um array de objetos do tipo ArquivoSelecionadoComSuaMiniatura, onde cada um possui o arquivo original e sua miniatura.

            const arquivosProcessados = await ArquivosPublicacaoService.processaImagensEVideosRecebidosDoUsuario(
                arquivosSelecionados
            );

            //Após obter o array de ArquivoSelecionadoComSuaMiniatura, onde cada objeto terá 2 propriedades (arquivo original e miniatura), chamo a função que devolve uma lista de objetos semelhantes, porém ao invés do valor se do tipo File, será do tipo string base64, já que será essa a forma de envio dos arquivos para o servidor

            arquivosBase64 = await ArquivosPublicacaoService.transformaArquivosProcessadosEmBase64(
                arquivosProcessados
            );

        }

        return APIService.post('publicacoes', {
            texto: texto,
            arquivos: arquivosSelecionados ? JSON.stringify(arquivosBase64) : null
        })

    }

    public static async compartilhar(texto: string | null, publicacao: PublicacaoModel) {
        return APIService.post(`publicacoes/${publicacao.id}/compartilhar`, { texto })
    }

    public static async editar(
        texto: string | null,
        novosArquivosSelecionados: FileList | null,
        idsDasMidiasParaExcluir: Array<number>,
        publicacao: PublicacaoModel | PublicacaoCompartilhadaModel
    ) {
        let arquivosBase64 = null;

        if (novosArquivosSelecionados) {

            //Se houve alguma mídia selecionada, chama a função processaImagensEVideosRecebidosDoUsuario que diminui o tamanho da imagem para gerar sua miniatura e no caso dos vídeos, obtem a miniatura(imagem) do vídeo, retornando no then um array de objetos do tipo ArquivoSelecionadoComSuaMiniatura, onde cada um possui o arquivo original e sua miniatura.

            const arquivosProcessados = await ArquivosPublicacaoService.processaImagensEVideosRecebidosDoUsuario(
                novosArquivosSelecionados
            );

            //Após obter o array de ArquivoSelecionadoComSuaMiniatura, onde cada objeto terá 2 propriedades (arquivo original e miniatura), chamo a função que devolve uma lista de objetos semelhantes, porém ao invés do valor se do tipo File, será do tipo string base64, já que será essa a forma de envio dos arquivos para o servidor

            arquivosBase64 = await ArquivosPublicacaoService.transformaArquivosProcessadosEmBase64(
                arquivosProcessados
            );

        }

        return APIService.put(`publicacoes/${publicacao.id}`, { 
            texto: texto,
            idsDasMidiasParaExcluir: idsDasMidiasParaExcluir,
            arquivos: novosArquivosSelecionados ? JSON.stringify(arquivosBase64) : null
        });
    }
}