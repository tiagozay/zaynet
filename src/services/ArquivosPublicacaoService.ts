export class ArquivosPublicacaoService {
    private static readAsDataURL(arquivo: File): Promise<string>
    {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(arquivo);
        })
    }

    public static transformaFileListEmBase65(arquivos: FileList) 
    {
        const base64Promises = Array.from(arquivos).map( arquivo => this.readAsDataURL(arquivo) );

        return Promise.all(base64Promises);
    }

    public static obtemExtensaoArquivoBase64(arquivoBase64: string): string
    {
        const matches = arquivoBase64.match(/^data:(image\/\w+|video\/\w+);base64,/) as Array<string>;

        const imageType = matches[1];
    
        return imageType.split('/')[1];
    }
}