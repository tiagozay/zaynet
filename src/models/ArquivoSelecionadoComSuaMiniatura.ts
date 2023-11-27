export class ArquivoSelecionadoComSuaMiniatura {
    public arquivoSelecionado: File;
    public miniaturaDoArquivo: File;

    public constructor(arquivoSelecionado: File, miniaturaDoArquivo: File) {
        this.arquivoSelecionado = arquivoSelecionado;
        this.miniaturaDoArquivo = miniaturaDoArquivo;
    }
}