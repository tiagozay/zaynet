import React, { useEffect, useRef, useState } from 'react';
import './ModalEditarPublicacao.css';
import SelecionarArquivos from '../SelecionarArquivos';
import { MidiaPublicacaoModel } from '../../models/MidiaPublicacaoModel';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';

interface ModalEditarPublicacaoProps {
    modalAberto: boolean,
    fecharModal: () => void
}

export default function ModalEditarPublicacao({ modalAberto, fecharModal }: ModalEditarPublicacaoProps) {

    //Mock provisório de uma publicação. Posteriormente ela virá do redux ou algo semelhante.
    const publicacao = {
        texto: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, distinctio autem? Magnam autem quisquam voluptates eius cupiditate. Sapiente blanditiis obcaecati natus, similique, repellendus ipsum ipsam dicta eos consequatur, distinctio soluta?",
        midias: [
            new MidiaPublicacaoModel(
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub1.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub1.jpg',
            ),
            new MidiaPublicacaoModel(
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub2.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub2.jpg',
            ),
            new MidiaPublicacaoModel(
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub3.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub3.jpg',
            ),
            new MidiaPublicacaoModel(
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub4.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub4.jpg',
            ),
            new MidiaPublicacaoModel(
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub5.jpg',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub5.jpg',
            ),
            new MidiaPublicacaoModel(
                '/imagensDinamicas/publicacoes/imagensNormaisEVideos/pub6.mp4',
                '/imagensDinamicas/publicacoes/miniaturasDasImagens/pub6.jpg',
            ),
        ]
    }

    const [indicadorInputImagensEVideosAberto, setIndicadorInputImagensEVideosAberto] = useState(false);
    const [indicadorAlteracaoRealizada, setIndicadorAlteracaoRealizada] = useState(false);


    const [textoDaPublicacao, setTextoDaPublicacao] = useState<string | null>(null);
    const [midiasDaPublicacao, setMidiasDaPublicacao] = useState<MidiaPublicacaoModel[]>(publicacao.midias);

    const [novosArquivosSelecionados, setNovosArquivosSelecionados] = useState<FileList | null>(null);

    const isMobile = useMediaQuery({maxWidth: TAMANHO_DE_TELA_MOBILE});

    const overlay = useRef(null);

    //Este useEffect é responsável por resetar os estados toda vez que o modal for re-aberto.
    useEffect(() => {
        setIndicadorInputImagensEVideosAberto(false);
        setIndicadorAlteracaoRealizada(false);
        setTextoDaPublicacao(publicacao.texto);
        setMidiasDaPublicacao(publicacao.midias);
        setNovosArquivosSelecionados(null);
    }, [modalAberto]);

    useEffect(() => {
        fecharModal();
    }, [isMobile]);

    useEffect(() => {
        if(
            textoDaPublicacao?.trim() !== publicacao.texto ||
            midiasDaPublicacao.length !== publicacao.midias.length ||
            novosArquivosSelecionados?.length
        ){
            setIndicadorAlteracaoRealizada(true);
        }else{
            setIndicadorAlteracaoRealizada(false);
        }
    }, [textoDaPublicacao, midiasDaPublicacao, novosArquivosSelecionados]);



    if (!modalAberto) {
        document.body.style.overflowY = 'scroll';
        return null;
    }

    document.body.style.overflowY = 'hidden';

    function publicar() {

    }

    function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === overlay.current) {
            fecharModal();
        }
    }

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDaPublicacao(e.target.value);
    }

    //Função provísória que serve para excluir imagens do array. Quando esta parte for integrada com o back-end a implementação dela pode mudar. Esta serve apenas para modificar o estado e identificar a mudança.
    function excluirImagem(indice: number)
    {
        setMidiasDaPublicacao( state => {
            return state.filter( (midia, index) => indice !== index );
        } );
    }

    function abrirInputImagensEVideos() {
        setIndicadorInputImagensEVideosAberto(true);
    }

    function fecharInputImagensEVideos() {
        setIndicadorInputImagensEVideosAberto(false);
    }

    return (
        <div id="modalEditarPublicacao__overlay" ref={overlay} onClick={clickOverlay}>
            <div id="modalEditarPublicacao">
                <div id='modalEditarPublicacao__tituloEBtnDeFechar'>
                    <h3 id='modalEditarPublicacao__tituloModal'>Editar publicação</h3>
                    <button
                        id='modalEditarPublicacao__btnFechar'
                        className='material-symbols-outlined'
                        onClick={fecharModal}
                    >close</button>
                </div>
                <div id='modalEditarPublicacao__container'>
                    <div id="modalEditarPublicacao__nomeEPerfilDoUsuario">
                        <img
                            src="./imagensDinamicas/perfil.jpg"
                            alt="Perfil usuário"
                            id="modalEditarPublicacao__perfilUsuario"
                        />
                        <p id="modalEditarPublicacao__nomeUsuario">Pedro souza</p>
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
                                    midiasDaPublicacao.map((midia, index) => {
                                        return (
                                            <li id='modalEditarPublicacao__midiasDaPublicacao__midia' key={midia.caminhoMidiaNormal}>
                                                <div id='modalEditarPublicacao__midiasDaPublicacao__midiaOvelay'>
                                                    <button 
                                                        className='material-symbols-outlined'
                                                        id='modalEditarPublicacao__btnExcluirMidia'
                                                        onClick={ () => excluirImagem(index)}
                                                    >close</button>
                                                </div>
                                                <img
                                                    src={midia.caminhoMidiaMiniatura}
                                                    alt="Midia publicacao"
                                                />
                                            </li>
                                        );
                                    })
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
                        disabled={!indicadorAlteracaoRealizada}
                        className={!indicadorAlteracaoRealizada ? "modalEditarPublicacao__btnSalvarInativo" : ""}
                        onClick={publicar}
                    >Salvar</button>
                </div>
            </div>
        </div>
    )
}
