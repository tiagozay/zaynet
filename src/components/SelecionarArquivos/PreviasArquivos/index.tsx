import React from 'react';
import './PreviasArquivos.css';
import { ArquivosPublicacaoService } from '../../../services/ArquivosPublicacaoService';

interface PreviasArquivosProps {
    clickFecharInput: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    indicadorImagensCarregadas: boolean,
    SRCsDasImagens: string[],
    aoCarregarTodasAsMidiasNasPrevias: () => void
}

export default function PreviasArquivos({
    clickFecharInput,
    indicadorImagensCarregadas,
    SRCsDasImagens,
    aoCarregarTodasAsMidiasNasPrevias
}: PreviasArquivosProps) {

    let contadorDeMidiasCarregadas = 1;

    function aoCarregarMidia() {
        if (contadorDeMidiasCarregadas === SRCsDasImagens.length) {
            aoCarregarTodasAsMidiasNasPrevias();
        }
        contadorDeMidiasCarregadas++;
    }

    return (
        <div id="inputArquivos__previas">

            <div id="inputArquivos__previas__divBtnFechar">
                <button
                    id='inputArquivos__arrasteESolteImagensEVideos__fecharPrevias'
                    className='material-symbols-outlined'
                    onClick={clickFecharInput}
                >close</button>
            </div>

            {
                !indicadorImagensCarregadas ?
                    <div className="loader-container">
                        <div className="loader"></div>
                        Carregando mídias...
                    </div> :
                    <></>
            }

            <ul id="inputArquivos__previas__listaDasPrevias">
                {

                    SRCsDasImagens.map((srcImagem, index) => {

                        const extensao = ArquivosPublicacaoService.obtemExtensaoArquivoBase64(srcImagem);

                        if (extensao === "png" || extensao === "jpg" || extensao === "jpeg") {
                            return (
                                <li key={index}>
                                    <img
                                        src={srcImagem}
                                        id='inputArquivos__previa'
                                        onLoad={aoCarregarMidia}
                                    />
                                </li>

                            )
                        } else if (extensao === "mp4") {
                            return (
                                <li key={index}>
                                    <video
                                        src={srcImagem}
                                        controls
                                        id='inputArquivos__previa'
                                        onLoadedMetadata={aoCarregarMidia}
                                    >
                                    </video>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </div>
    )
}
