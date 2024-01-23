export class ArquivoSelecionadoComSuaMiniatura {
    public arquivoOriginal: File;
    public miniatura: File;

    public constructor(arquivoOriginal: File, miniatura: File) {
        this.arquivoOriginal = arquivoOriginal;
        this.miniatura = miniatura;
    }
}