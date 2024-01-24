import React, { useEffect, useRef, useState } from 'react';
import './ModalEditarPublicacao.css';
import SelecionarArquivos from '../SelecionarArquivos';
import { MidiaPublicacaoModel } from '../../models/MidiaPublicacaoModel';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import ModalDeConfirmacao from '../ModalDeConfirmacao';
import MidiaEditarPublicacao from '../MidiaEditarPublicacao';
import UsuarioService from '../../services/UsuarioService';

interface ModalEditarPublicacaoProps {
    modalAberto: boolean,
    fecharModal: () => void
}

export default function ModalEditarPublicacao({ modalAberto, fecharModal }: ModalEditarPublicacaoProps) {

    //Mock provisório de uma publicação. Posteriormente ela virá do redux ou algo semelhante.
    const publicacao = {
        texto: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, distinctio autem? Magnam autem quisquam voluptates eius cupiditate. Sapiente blanditiis obcaecati natus, similique, repellendus ipsum ipsam dicta eos consequatur, distinctio soluta?",
        midias: [
            new MidiaPublicacaoModel(null,
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub1.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub1.jpg',
            ),
            new MidiaPublicacaoModel(null,
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub2.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub2.jpg',
            ),
            new MidiaPublicacaoModel(null,
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub3.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub3.jpg',
            ),
            new MidiaPublicacaoModel(null,
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub4.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub4.jpg',
            ),
            new MidiaPublicacaoModel(null,
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub5.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub5.jpg',
            ),
            new MidiaPublicacaoModel(null,
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub6.mp4',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub6.jpg',
            ),
        ]
    }

    const [indicadorInputImagensEVideosAberto, setIndicadorInputImagensEVideosAberto] = useState(false);
    const [indicadorAlgumaAlteracaoRealizada, setIndicadorAlgumaAlteracaoRealizada] = useState(false);

    const [textoDaPublicacao, setTextoDaPublicacao] = useState<string | null>(null);
    const [midiasDaPublicacao, setMidiasDaPublicacao] = useState<MidiaPublicacaoModel[]>(publicacao.midias);

    const [novosArquivosSelecionados, setNovosArquivosSelecionados] = useState<FileList | null>(null);

    const [indicadorModalConfirmacaoDescartarAberto, setIndicadorModalConfirmacaoDescartarAberto] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    //Este useEffect é responsável por resetar os estados toda vez que o modal for re-aberto.
    useEffect(() => {
        setIndicadorInputImagensEVideosAberto(false);
        setIndicadorAlgumaAlteracaoRealizada(false);
        setTextoDaPublicacao(publicacao.texto);
        setMidiasDaPublicacao(publicacao.midias);
        setNovosArquivosSelecionados(null);
    }, [modalAberto]);

    useEffect(() => {
        if (isMobile) {
            fecharModal();
        }
    }, [isMobile]);

    useEffect(() => {
        if (
            textoDaPublicacao?.trim() !== publicacao.texto ||
            midiasDaPublicacao.length !== publicacao.midias.length ||
            novosArquivosSelecionados?.length
        ) {
            setIndicadorAlgumaAlteracaoRealizada(true);
        } else {
            setIndicadorAlgumaAlteracaoRealizada(false);
        }
    }, [textoDaPublicacao, midiasDaPublicacao, novosArquivosSelecionados]);

    function publicar() {

    }

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDaPublicacao(e.target.value);
    }

    //Função provísória que serve para excluir imagens do array. Quando esta parte for integrada com o back-end a implementação dela pode mudar. Esta serve apenas para modificar o estado e identificar a mudança.
    function excluirMidia(indice: number) {
        setMidiasDaPublicacao(state => {
            return state.filter((midia, index) => indice !== index);
        });
    }

    function abrirInputImagensEVideos() {
        setIndicadorInputImagensEVideosAberto(true);
    }

    function fecharInputImagensEVideos() {
        setIndicadorInputImagensEVideosAberto(false);
    }

    function clickFechar() {

        if (indicadorAlgumaAlteracaoRealizada) {
            setIndicadorModalConfirmacaoDescartarAberto(true);
        } else {
            fecharModal();
        }
    }

    function aoConfirmarDescartarAlteracoes() {
        fecharModal();
    }

    function fecharModalConfirmacaoDescartar() {
        setIndicadorModalConfirmacaoDescartarAberto(false);
    }

    return (
        <>
            {
                indicadorModalConfirmacaoDescartarAberto ?
                    <ModalDeConfirmacao
                        titulo='Descartar alterações?'
                        mensagem='Deseja realmente descartar as alterações?'
                        modalAberto={indicadorModalConfirmacaoDescartarAberto}
                        fecharModal={fecharModalConfirmacaoDescartar}
                        aoConfirmar={aoConfirmarDescartarAlteracoes}
                    /> :
                    ""
            }


            <div id="modalEditarPublicacao__overlay">
                <div id="modalEditarPublicacao">
                    <div id='modalEditarPublicacao__tituloEBtnDeFechar'>
                        <h3 id='modalEditarPublicacao__tituloModal'>Editar publicação</h3>
                        <button
                            id='modalEditarPublicacao__btnFechar'
                            className='material-symbols-outlined'
                            onClick={clickFechar}
                        >close</button>
                    </div>
                    <div id='modalEditarPublicacao__container'>
                        <div id="modalEditarPublicacao__nomeEPerfilDoUsuario">
                            <img
                                src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
                                alt="Perfil usuário"
                                id="modalEditarPublicacao__perfilUsuario"
                            />
                            <p id="modalEditarPublicacao__nomeUsuario">{UsuarioService.obtemNomeCompletoDoUsuarioLogado()}</p>
                        </div>

                        <div id='modalEditarPublicacao__containerInputs'>
                            <textarea
                                id='modalEditarPublicacao__campoTexto'
                                className={
                                    indicadorInputImagensEVideosAberto ? "modalEditarPublicacao__campoTextoMaisBaixo" : ""
                                }
                                value={textoDaPublicacao ? textoDaPublicacao : ""}
                                placeholder='No que você está pensando, Pedro?'
                                onChange={aoDigitarTexto}
                                spellCheck={false}
                            ></textarea>

                            <div id='modalEditarPublicacao__midiasDaPublicacao'>
                                <ul id='modalEditarPublicacao__midiasDaPublicacao__listaMidias'>
                                    {
                                        midiasDaPublicacao.map((midia, index) => 
                                            <MidiaEditarPublicacao 
                                                midiaPublicacao={midia}
                                                excluirMidia={excluirMidia}
                                                index={index}
                                                key={index}
                                            />
                                        )
                                    }
                                </ul>
                            </div>

                            {
                                indicadorInputImagensEVideosAberto &&

                                <SelecionarArquivos
                                    fecharInput={fecharInputImagensEVideos}
                                    setArquivosSelecionados={setNovosArquivosSelecionados}
                                />
                            }
                        </div>
                        <div id='modalEditarPublicacao__divAdicionarFotosEVideos'>
                            <p>Adicionar à publicação</p>
                            <div id='modalEditarPublicacao__divAdicionarFotosEVideos__icones'>
                                <button onClick={abrirInputImagensEVideos}>
                                    <img src="./icones/imagemIcone.png" alt="" />
                                </button>
                                <button onClick={abrirInputImagensEVideos}>
                                    <img src="./icones/videoIcone.png" alt="" />
                                </button>
                            </div>
                        </div>
                        <button
                            id='modalEditarPublicacao__btnSalvar'
                            disabled={!indicadorAlgumaAlteracaoRealizada}
                            className={!indicadorAlgumaAlteracaoRealizada ? "modalEditarPublicacao__btnSalvarInativo" : ""}
                            onClick={publicar}
                        >Salvar</button>
                    </div>
                </div>
            </div>
        </>

    )
}
