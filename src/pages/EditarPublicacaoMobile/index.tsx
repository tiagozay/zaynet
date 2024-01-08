import React, { useEffect, useState } from 'react';
import './EditarPublicacaoMobile.css';
import { useNavigate } from 'react-router-dom';
import SelecionarArquivos from '../../components/SelecionarArquivos';
import { MidiaPublicacaoModel } from '../../models/MidiaPublicacaoModel';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import MidiaEditarPublicacao from '../../components/MidiaEditarPublicacao';
import ModalDeConfirmacao from '../../components/ModalDeConfirmacao';

export default function EditarPublicacaoMobile() {

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
    const [modalDeConfirmacaoDeDescarteAberto, setmodalDeConfirmacaoDeDescarteAberto] = useState(false);

    const [textoDaPublicacao, setTextoDaPublicacao] = useState<string | null>(null);
    const [midiasDaPublicacao, setMidiasDaPublicacao] = useState<MidiaPublicacaoModel[]>(publicacao.midias);

    const [novosArquivosSelecionados, setNovosArquivosSelecionados] = useState<FileList | null>(null);

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    const navigate = useNavigate();

    useEffect(() => {
        setIndicadorInputImagensEVideosAberto(false);
        setIndicadorAlteracaoRealizada(false);
        setTextoDaPublicacao(publicacao.texto);
        setMidiasDaPublicacao(publicacao.midias);
        setNovosArquivosSelecionados(null);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            navigate(-1);
        }
    }, [isMobile]);

    useEffect(() => {
        if (
            textoDaPublicacao?.trim() !== publicacao.texto ||
            midiasDaPublicacao.length !== publicacao.midias.length ||
            novosArquivosSelecionados?.length
        ) {
            setIndicadorAlteracaoRealizada(true);
        } else {
            setIndicadorAlteracaoRealizada(false);
        }
    }, [textoDaPublicacao, midiasDaPublicacao, novosArquivosSelecionados]);

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDaPublicacao(e.target.value);
    }

    //Função provísória que serve para excluir imagens do array. Quando esta parte for integrada com o back-end a implementação dela pode mudar. Esta serve apenas para modificar o estado e identificar a mudança.
    function excluirMidia(indice: number) {
        setMidiasDaPublicacao(state => {
            return state.filter((midia, index) => indice !== index);
        });
    }

    function aoClicarEmVoltar() {
        if (indicadorAlteracaoRealizada) {
            abrirModalDeConfirmacaoDeDescarte();
        } else {
            navigate(-1);
        }

    }

    function abrirModalDeConfirmacaoDeDescarte() {
        setmodalDeConfirmacaoDeDescarteAberto(true);
    }

    function fecharModalDeConfirmacaoDeDescarte() {
        setmodalDeConfirmacaoDeDescarteAberto(false);
    }

    function aoConfirmarDescarte() {
        navigate(-1);
    }

    function abrirInputImagensEVideos() {
        setIndicadorInputImagensEVideosAberto(true);
    }

    function fecharInputImagensEVideos() {
        setIndicadorInputImagensEVideosAberto(false);
    }

    return (
        <>
            {
                modalDeConfirmacaoDeDescarteAberto ?
                    <ModalDeConfirmacao
                        aoConfirmar={aoConfirmarDescarte}
                        fecharModal={fecharModalDeConfirmacaoDeDescarte}
                        mensagem='Deseja realmente descartar as alterações?'
                        titulo='Descartar alterações?'
                        modalAberto={modalDeConfirmacaoDeDescarteAberto}
                    /> : ""
            }
            <div id="editarPublicacaoMobile__page">
                <div id="editarPublicacaoMobile__cabecalho">
                    <div id="editarPublicacaoMobile__cabecalho__container">
                        <button
                            onClick={aoClicarEmVoltar}
                            className='material-symbols-outlined'
                            id='editarPublicacaoMobile__btnVoltar'
                        >arrow_back</button>
                        <h3 id="editarPublicacaoMobile__titulo">Editar publicação</h3>
                    </div>
                    <button
                        id="editarPublicacaoMobile__btnSalvar"
                        disabled={!indicadorAlteracaoRealizada}
                        className={!indicadorAlteracaoRealizada ? "editarPublicacaoMobile__btnSalvarInativo" : ""}
                    >SALVAR</button>
                </div>

                <div id="editarPublicacaoMobile__container">
                    <div id="editarPublicacaoMobile__divPerfilENomeUsuario">
                        <img
                            src="./imagensDinamicas/perfil.jpg"
                            alt="Perfil usuário"
                            id="editarPublicacaoMobile__divPerfilENomeUsuario__perfil"
                        />
                        <p
                            id="editarPublicacaoMobile__divPerfilENomeUsuario__nome"
                        >Pedro souza</p>
                    </div>

                    <textarea
                        id="editarPublicacaoMobile__campoTexto"
                        placeholder='No que você está pensando, Pedro?'
                        onChange={aoDigitarTexto}
                        value={textoDaPublicacao ? textoDaPublicacao : ""}
                        spellCheck={false}
                    >
                    </textarea>

                    <div id='editarPublicacaoMobile__midiasDaPublicacao'>
                        <ul id='editarPublicacaoMobile__midiasDaPublicacao__listaMidias'>

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

                <div id="editarPublicacaoMobile__divIconeFotoOuVideo" className={indicadorInputImagensEVideosAberto ? 'displayNone' : ""}>
                    <button onClick={abrirInputImagensEVideos}>
                        <img src="./icones/imagemIcone.png" alt="" />
                    </button>
                </div>

            </div>
        </>

    )
}
