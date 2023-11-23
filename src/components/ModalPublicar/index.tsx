import React, { useEffect, useRef, useState } from 'react';
import './ModalPublicar.css';
import SelecionarArquivos from '../SelecionarArquivos';
import { ArquivosPublicacaoService } from '../../services/ArquivosPublicacaoService';

class ArquivoSelecionadoComSuaMiniatura {
    public arquivoSelecionado: File;
    public miniaturaDoArquivo: File;

    public constructor(arquivoSelecionado: File, miniaturaDoArquivo: File) {
        this.arquivoSelecionado = arquivoSelecionado;
        this.miniaturaDoArquivo = miniaturaDoArquivo;
    }
}


interface ModalPublicarProps {
    modalAberto: boolean,
    fecharModal: () => void
}

export default function ModalPublicar({ modalAberto, fecharModal }: ModalPublicarProps) {

    const [indicadorInputImagensEVideosAberto, setIndicadorInputImagensEVideosAberto] = useState(false);
    const [permisaoParaPublicar, setPermisaoParaPublicar] = useState(false);
    const [indicadorAlgumTextoDigitado, setIndicadorAlgumTextoDigitado] = useState(false);
    const [indicadorAlgumaMidiaSelecionada, setIndicadorAlgumaMidiaSelecionada] = useState(false);

    const [textoDigitado, setTextoDigitado] = useState<string | null>(null);
    const [arquivosSelecionados, setArquivosSelecionados] = useState<FileList | null>(null);

    const container = useRef(null);

    //Este useEffect é responsável por resetar os estados toda vez que o modal for re-aberto.
    useEffect(() => {
        setIndicadorInputImagensEVideosAberto(false);
        setPermisaoParaPublicar(false);
        setIndicadorAlgumTextoDigitado(false);
        setIndicadorAlgumaMidiaSelecionada(false);
        setTextoDigitado(null);
        setArquivosSelecionados(null);
    }, [modalAberto]);

    useEffect(() => {
        if (textoDigitado && textoDigitado.length > 0) {
            setIndicadorAlgumTextoDigitado(true);
        } else {
            setIndicadorAlgumTextoDigitado(false);
        }
    }, [textoDigitado]);

    useEffect(() => {
        if (arquivosSelecionados) {
            setIndicadorAlgumaMidiaSelecionada(true);
        } else {
            setIndicadorAlgumaMidiaSelecionada(false);
        }
    }, [arquivosSelecionados]);

    useEffect(() => {
        if (indicadorAlgumTextoDigitado || indicadorAlgumaMidiaSelecionada) {
            setPermisaoParaPublicar(true);
        } else {
            setPermisaoParaPublicar(false);
        }
    }, [indicadorAlgumTextoDigitado, indicadorAlgumaMidiaSelecionada]);

    useEffect(() => {

        let handleEscKey = (event: KeyboardEvent) => {
            event.key === 'Escape' && fecharModal();
        }

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    if (!modalAberto) {
        document.body.style.overflowY = 'scroll';
        return null;
    }

    document.body.style.overflowY = 'hidden';

    function publicar() {

        //Publicação de arquivos provisória, apenas um protótipo

        if (arquivosSelecionados) {
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

            Promise.all(listaDeArquivosComSuasMiniaturasPromises)
                .then(res => {

                    const formData = new FormData();

                    res.forEach( imagem => {

                        const novoNomeImagem = ArquivosPublicacaoService.geraStringUnica();

                        const extensaoImagem = ArquivosPublicacaoService.obtemExtensaoArquivoAPartirDoNome(
                            imagem.arquivoSelecionado.name
                        );
                        const extensaoMiniatura = ArquivosPublicacaoService.obtemExtensaoArquivoAPartirDoNome(
                            imagem.miniaturaDoArquivo.name
                        );

                        formData.append(
                            'arquivos[]', 
                            imagem.arquivoSelecionado, 
                            `${novoNomeImagem}.${extensaoImagem}`
                        );

                        formData.append(
                            'arquivos[]', 
                            imagem.miniaturaDoArquivo, 
                            `${novoNomeImagem}_miniatura.${extensaoMiniatura}`
                        );

                    });

                    console.log("Foi");


                    fetch('http://localhost:8080/cadastrarPublicacao.php', {
                        method: 'post',
                        body: formData
                    })
                        .then( res => res.text() )
                        .then( res => console.log(res) );

                });
        }
    }

    function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === container.current) {
            fecharModal();
        }
    }

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDigitado(e.target.value.trim());
    }

    function abrirInputImagensEVideos() {
        setIndicadorInputImagensEVideosAberto(true);
    }

    function fecharInputImagensEVideos() {
        setIndicadorInputImagensEVideosAberto(false);
    }

    return (
        <div id="modalPublicar__overlay" ref={container} onClick={clickOverlay}>
            <div id="modalPublicar">
                <div id='modalPublicar__tituloEBtnDeFechar'>
                    <h3 id='modalPublicar__tituloModal'>Criar publicação</h3>
                    <button
                        id='modalPublicar__btnFechar'
                        className='material-symbols-outlined'
                        onClick={fecharModal}
                    >close</button>
                </div>
                <div id='modalPublicar__container'>
                    <div id="modalPublicar__nomeEPerfilDoUsuario">
                        <img
                            src="./imagensDinamicas/perfil.jpg"
                            alt="Perfil usuário"
                            id="modalPublicar__perfilUsuario"
                        />
                        <p id="modalPublicar__nomeUsuario">Tiago zay</p>
                    </div>

                    <div id='modalPublicar__containerInputs'>
                        <textarea
                            id='modalPublicar__campoTexto'
                            className={
                                indicadorInputImagensEVideosAberto ? "modalPublicar__campoTextoMaisBaixo" : ""
                            }
                            placeholder='No que você está pensando, Tiago?'
                            onChange={aoDigitarTexto}
                        ></textarea>

                        {
                            indicadorInputImagensEVideosAberto &&

                            <SelecionarArquivos
                                fecharInput={fecharInputImagensEVideos}
                                setArquivosSelecionados={setArquivosSelecionados}
                            />
                        }
                    </div>
                    <div id='modalPublicar__divAdicionarFotosEVideos'>
                        <p>Adicionar à publicação</p>
                        <div id='modalPublicar__divAdicionarFotosEVideos__icones'>
                            <button onClick={abrirInputImagensEVideos}>
                                <img src="./icones/imagemIcone.png" alt="" />
                            </button>
                            <button onClick={abrirInputImagensEVideos}>
                                <img src="./icones/videoIcone.png" alt="" />
                            </button>
                        </div>
                    </div>
                    <button
                        id='modalPublicar__btnPublicar'
                        disabled={!permisaoParaPublicar}
                        className={!permisaoParaPublicar ? "modalPublicar__btnPublicarInativo" : ""}
                        onClick={publicar}
                    >Publicar</button>
                </div>
            </div>
        </div>
    )
}
