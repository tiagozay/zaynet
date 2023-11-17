import React, { useEffect, useRef, useState } from 'react';
import './SelecionarArquivos.css';
import { ArquivosPublicacaoService } from '../../services/ArquivosPublicacaoService';
import PreviasArquivos from './PreviasArquivos';

interface SelecionarArquivosProps {
    fecharInput: () => void,
    setArquivosSelecionados: React.Dispatch<React.SetStateAction<FileList | null>>
}

export default function SelecionarArquivos({
    fecharInput,
    setArquivosSelecionados
}: SelecionarArquivosProps) {

    const inputRef = useRef<HTMLInputElement>(null);
    const inputDeArrastarRef = useRef<HTMLInputElement>(null);
    const btnFecharInputRef = useRef<HTMLButtonElement>(null);

    const [indicadorArquivoSendoArrastado, setIndicadorArquivoSendoArrastado] = useState(false);

    const [novosArquivosSelecionados, setNovosArquivosSelecionados] = useState<FileList | null>(null);
    const [SRC_dosArquivosSelecionados, setSRC_dosArquivosSelecionados] = useState<string[]>([]);

    const [indicadorImagensCarregadas, setIndicadorImagensCarregadas] = useState(false);

    useEffect(() => {

        if (!novosArquivosSelecionados) return;

        ArquivosPublicacaoService.transformaFileListEmBase65(novosArquivosSelecionados)
            .then(arquivosBase64 => {
                setSRC_dosArquivosSelecionados(arquivosBase64);
            });

    }, [novosArquivosSelecionados]);

    function aoCarregarTodasAsMidias() {
        setIndicadorImagensCarregadas(true);
    }

    function aoClicarEmSelecionarArquivos(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if(btnFecharInputRef.current != e.target){
            inputRef.current?.click();
        }
    }

    function dragEnter(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIndicadorArquivoSendoArrastado(true);
    }

    function dragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        if (e.target === inputDeArrastarRef.current) {
            setIndicadorArquivoSendoArrastado(false);
        }
    }

    function allowDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    function drop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIndicadorArquivoSendoArrastado(false);
        let arquivos = e.dataTransfer.files;
        handleFiles(arquivos);
    }

    function aoSelecionarNoInput(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    }

    function handleFiles(arquivos: FileList) {
        setNovosArquivosSelecionados(arquivos);
        setArquivosSelecionados(arquivos);
    }

    function clickFecharInput(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setArquivosSelecionados(null);
        fecharInput();
    }

    return (
        <div id="inputArquivos__arrasteESolteImagensEVideos">
            {
                novosArquivosSelecionados ?
                    <PreviasArquivos
                        SRCsDasImagens={SRC_dosArquivosSelecionados}
                        indicadorImagensCarregadas={indicadorImagensCarregadas}
                        clickFecharInput={clickFecharInput}
                        aoCarregarTodasAsMidiasNasPrevias={aoCarregarTodasAsMidias}
                    /> :
                    <>
                        <input type="file" className='displayNone' ref={inputRef} onChange={aoSelecionarNoInput} multiple />
                        <div
                            id='inputArquivos__arrasteESolteImagensEVideos__input'
                            className={indicadorArquivoSendoArrastado ? "usuarioArastandoArquivo" : ""}
                            onClick={aoClicarEmSelecionarArquivos}
                            ref={inputDeArrastarRef}
                            onDragEnter={dragEnter}
                            onDragLeave={dragLeave}
                            onDragOver={allowDrop}
                            onDrop={drop}
                        >
                            <button
                                id='inputArquivos__arrasteESolteImagensEVideos__fechar'
                                className='material-symbols-outlined'
                                onClick={clickFecharInput}
                                ref={btnFecharInputRef}
                            >close</button>
                            <i className='material-symbols-outlined'>add_photo_alternate</i>
                            <p id='inputArquivos__arrasteESolteImagensEVideos__input__texto'>Adicionar fotos/vídeos</p>
                            <p id='inputArquivos__arrasteESolteImagensEVideos__input__texto2'>ou arraste e solte</p>
                        </div>
                    </>

            }
        </div>
    )
}
