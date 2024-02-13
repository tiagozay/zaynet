import React from 'react';
import './MidiaEditarPublicacao.css';
import { MidiaPublicacaoModel } from '../../models/Publicacao/MidiaPublicacaoModel';
import { ArquivosPublicacaoService } from '../../services/ArquivosPublicacaoService';

interface MidiaEditarPublicacaoProps {
    midiaPublicacao: MidiaPublicacaoModel,
    excluirMidia: (index: number) => void,
    index: number
}

export default function MidiaEditarPublicacao({ 
    midiaPublicacao, 
    excluirMidia,
    index 
}: MidiaEditarPublicacaoProps) {

    const imagemOuVideo = ArquivosPublicacaoService
        .identificaSeArquivoEImagemOuVideoPeloNome(midiaPublicacao.caminhoMidiaNormal);

    return (
        <li id='modalEditarPublicacao__midiasDaPublicacao__midia'>
            <div id='modalEditarPublicacao__midiasDaPublicacao__midiaOvelay'>
                <div id='modalEditarPublicacao__midiaOvelay__divBtnFechar'>
                    <button
                        className='material-symbols-outlined'
                        id='modalEditarPublicacao__btnExcluirMidia'
                        onClick={() => excluirMidia(midiaPublicacao.id as number)}
                    >close</button>
                </div>
                {
                    imagemOuVideo === 'Vídeo' ?
                        <i
                            className='material-symbols-outlined'
                            id='modalEditarPublicacao__midia__iconePlay'
                        >play_circle</i> :
                        ""
                }
            </div>
            <img
                src={`${process.env.REACT_APP_CAMINHO_MIDIA_PUBLICACAO_MINIATURA}${midiaPublicacao.caminhoMidiaMiniatura}` }
                alt="Midia publicacao"
            />
        </li>
    );
}
