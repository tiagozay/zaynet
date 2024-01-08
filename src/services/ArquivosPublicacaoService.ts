import { ArquivoSelecionadoComSuaMiniatura } from "../models/ArquivoSelecionadoComSuaMiniatura";

export class ArquivosPublicacaoService {
    private static readAsDataURL(arquivo: File): Promise<string> {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(arquivo);
        })
    }

    public static transformaFileListEmBase64(arquivos: FileList) {
        const base64Promises = Array.from(arquivos).map(arquivo => this.transformaFileEmBase64(arquivo));

        return Promise.all(base64Promises);
    }

    public static transformaFileEmBase64(arquivo: File)
    {
        return this.readAsDataURL(arquivo);
    }

    public static obtemExtensaoArquivoBase64(arquivoBase64: string): string {
        const matches = arquivoBase64.match(/^data:(image\/\w+|video\/\w+);base64,/) as Array<string>;

        const imageType = matches[1];

        return imageType.split('/')[1];
    }

    public static obtemExtensaoArquivoAPartirDoNome(nome: string): string | undefined {
        return nome.split('.').pop()?.toLowerCase();
    }

    public static identificaSeArquivoEImagemOuVideoPeloNome(nome: string): 'Imagem' | 'Vídeo' | undefined {

        const extensao = ArquivosPublicacaoService.obtemExtensaoArquivoAPartirDoNome(nome);

        // Lista de extensões comuns para imagens
        const extensoesImagem = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];

        // Lista de extensões comuns para vídeos
        const extensoesVideo = ['mp4', 'webm', 'ogg', 'avi', 'mov', 'mkv'];

        if (extensao) {
            if (extensoesImagem.includes(extensao)) {
                return "Imagem";
            } else if (extensoesVideo.includes(extensao)) {
                return "Vídeo"
            }
        }

        return undefined;
    }

    public static identificaSeArquivoEImagemOuVideo(arquivo: File): 'Imagem' | 'Vídeo' | undefined {
        const tipoMedia = arquivo.type.split('/')[0];

        switch (tipoMedia) {
            case 'image':
                return 'Imagem';
            case 'video':
                return 'Vídeo';
            default:
                return undefined;
        }
    }


    public static processaImagensEVideosRecebidosDoUsuario(arquivosSelecionados: FileList): Promise<ArquivoSelecionadoComSuaMiniatura[]> {
        const listaDeArquivosComSuasMiniaturasPromises = Array.from(arquivosSelecionados).map(arquivo => {
            const tipoArquivo = ArquivosPublicacaoService.identificaSeArquivoEImagemOuVideo(arquivo) as "Imagem" | "Vídeo";

            if (tipoArquivo === "Imagem") {

                return ArquivosPublicacaoService.diminuiTamanhoDeImagem(200, arquivo)
                    .then(miniatura => {
                        return new ArquivoSelecionadoComSuaMiniatura(
                            arquivo,
                            miniatura
                        );
                    });


            } else {
                return ArquivosPublicacaoService.obtemImagemDoPrimeiroFrameDoVideo(200, arquivo)
                    .then(miniatura => {
                        return new ArquivoSelecionadoComSuaMiniatura(
                            arquivo,
                            miniatura
                        );
                    });
            }

        });

        return Promise.all(listaDeArquivosComSuasMiniaturasPromises)
    }

    public static geraFormDataParaEnvioDeArquivosParaOServidor(arquivosProcessados: ArquivoSelecionadoComSuaMiniatura[]): FormData {
        const formData = new FormData();

        arquivosProcessados.forEach(arquivo => {

            const novoNomeArquivo = ArquivosPublicacaoService.geraStringUnica();

            const extensaoArquivo = ArquivosPublicacaoService.obtemExtensaoArquivoAPartirDoNome(
                arquivo.arquivoSelecionado.name
            );
            const extensaoMiniatura = ArquivosPublicacaoService.obtemExtensaoArquivoAPartirDoNome(
                arquivo.miniaturaDoArquivo.name
            );

            formData.append(
                'arquivos[]',
                arquivo.arquivoSelecionado,
                `${novoNomeArquivo}.${extensaoArquivo}`
            );

            formData.append(
                'arquivos[]',
                arquivo.miniaturaDoArquivo,
                `${novoNomeArquivo}_miniatura.${extensaoMiniatura}`
            );

        });

        return formData;
    }


    public static geraMiniaturasDeImagens(imagens: File[]) {
        const diminuirTamanhoDasImagensPromises = Array.from(imagens)
            .map(arquivo => {
                return ArquivosPublicacaoService.diminuiTamanhoDeImagem(200, arquivo);
            });

        return Promise.all(diminuirTamanhoDasImagensPromises)
    }

    public static geraMiniaturasDeVideos(videos: File[]) {
        const obterImagemDoPrimeiroFrameDoVideoPromises = Array.from(videos)
            .map(arquivo => {
                return ArquivosPublicacaoService.obtemImagemDoPrimeiroFrameDoVideo(200, arquivo);
            });

        return Promise.all(obterImagemDoPrimeiroFrameDoVideoPromises)
    }

    static async obtemImagemDoPrimeiroFrameDoVideo(width: number, file: File): Promise<File> {
        return new Promise((resolve, reject) => {
            const videoUrl = URL.createObjectURL(file);

            const video = document.createElement('video');
            video.muted = true;
            video.currentTime = 0.1;
            video.src = videoUrl;

            video.onloadedmetadata = function () {

                const razaoAltura = (width * video.videoHeight) / video.videoWidth;

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = razaoAltura;

                video.addEventListener('loadeddata', function () {
                    video.play();
                    video.pause();
                    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const thumbnailUrl = canvas.toDataURL('image/jpeg');

                    const file = ArquivosPublicacaoService.urlToFile(thumbnailUrl);

                    resolve(file);
                });
            };
        });
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

    public static geraStringUnica(): string {
        const data = new Date();

        const ano = data.getFullYear();
        const mes = data.getMonth() + 1;
        const dia = data.getDate();
        const hora = data.getHours();
        const aleatorio = Math.floor(Math.random() * 10000);

        return `${ano}${mes}${dia}${hora}${aleatorio}`;
    }
}