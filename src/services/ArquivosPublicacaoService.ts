export class ArquivosPublicacaoService {
    private static readAsDataURL(arquivo: File): Promise<string> {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(arquivo);
        })
    }

    public static transformaFileListEmBase65(arquivos: FileList) {
        const base64Promises = Array.from(arquivos).map(arquivo => this.readAsDataURL(arquivo));

        return Promise.all(base64Promises);
    }

    public static obtemExtensaoArquivoBase64(arquivoBase64: string): string {
        const matches = arquivoBase64.match(/^data:(image\/\w+|video\/\w+);base64,/) as Array<string>;

        const imageType = matches[1];

        return imageType.split('/')[1];
    }

    public static diminuiTamanhoDeImagem(width: number, image_file: File): Promise<File> {
        return new Promise((resolve) => {
            let reader = new FileReader();

            reader.readAsDataURL(image_file);

            reader.onload = (event: ProgressEvent<FileReader>) => {
                let image_url = event.target?.result as string;

                let image = new Image();
                image.src = image_url;

                image.onload = (e: Event) => {
                    if (image.width <= width) {
                        let arquivo = ArquivosPublicacaoService.urlToFile(image_url);
                        resolve(arquivo);
                        return;
                    }

                    let canvas = document.createElement("canvas");
                    let ratio = width / image.width;
                    canvas.width = width;
                    canvas.height = image.height * ratio;

                    const context = canvas.getContext('2d');
                    context?.drawImage(image, 0, 0, canvas.width, canvas.height);

                    let new_image_url = canvas.toDataURL('image/jpeg', 100);

                    let arquivo = ArquivosPublicacaoService.urlToFile(new_image_url);

                    resolve(arquivo);
                };
            };
        });
    }

    private static urlToFile(url: string): File {
        let arr = url.split(',');

        let mime = arr[0].match(/:(.*?);/)![1];
        let data = arr[1];

        let dataStr = atob(data);

        let n = dataStr.length;

        let dataArr = new Uint8Array(n);

        while (n--) {
            dataArr[n] = dataStr.charCodeAt(n);
        }

        let file = new File([dataArr], 'File.jpg', { type: mime });

        return file;
    }
}