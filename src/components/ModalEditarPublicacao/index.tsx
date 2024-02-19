import React, { useContext, useEffect, useRef, useState } from 'react';
import './ModalEditarPublicacao.css';
import SelecionarArquivos from '../SelecionarArquivos';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import ModalDeConfirmacao from '../ModalDeConfirmacao';
import MidiaEditarPublicacao from '../MidiaEditarPublicacao';
import UsuarioService from '../../services/UsuarioService';
import TextAreaTamanhoDinamico from '../TextAreaTamanhoDinamico';
import { PublicacaoModel } from '../../models/Publicacao/PublicacaoModel';
import { PublicacaoCompartilhadaModel } from '../../models/Publicacao/PublicacaoCompartilhadaModel';
import Publicacao from '../Publicacao';
import { EditarPublicacaoContext } from '../../contexts/EditarPublicacaoContext';
import { PublicacaoService } from '../../services/PublicacaoService';

interface ModalEditarPublicacaoProps {
    publicacao: PublicacaoModel | PublicacaoCompartilhadaModel,
    modalAberto: boolean,
    aoEditar: (publicacaoEditada: object) => void,
    fecharModal: () => void
}

export default function ModalEditarPublicacao({ publicacao, modalAberto, aoEditar, fecharModal }: ModalEditarPublicacaoProps) {

    const {
        textoDigitado,
        setTextoDigitado,
        midiasDaPublicacao,
        setMidiasDaPublicacao
    } = useContext(EditarPublicacaoContext);

    const [indicadorInputImagensEVideosAberto, setIndicadorInputImagensEVideosAberto] = useState(false);
    const [indicadorAlgumaAlteracaoRealizada, setIndicadorAlgumaAlteracaoRealizada] = useState(false);

    const [indicadorEdicaoSendoEnviada, setIndicadorEdicaoSendoEnviada] = useState(false);

    const [novosArquivosSelecionados, setNovosArquivosSelecionados] = useState<FileList | null>(null);

    const [indicadorModalConfirmacaoDescartarAberto, setIndicadorModalConfirmacaoDescartarAberto] = useState(false);

    const overlay = useRef(null);

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    //Este useEffect é responsável por resetar os estados toda vez que o modal for re-aberto.
    useEffect(() => {

        setIndicadorInputImagensEVideosAberto(false);
        setIndicadorAlgumaAlteracaoRealizada(false);
        setTextoDigitado(publicacao.texto);

        if (publicacao instanceof PublicacaoModel) {
            setMidiasDaPublicacao(publicacao.midiasPublicacao ? publicacao.midiasPublicacao : []);
        } else {
            setMidiasDaPublicacao([]);
        }


        setNovosArquivosSelecionados(null);
    }, [modalAberto]);

    useEffect(() => {
        if (isMobile) {
            fecharModal();
        }
    }, [isMobile]);

    useEffect(() => {

        let handleEscKey = (event: KeyboardEvent) => {
            event.key === 'Escape' && clickFechar();
        }

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [indicadorAlgumaAlteracaoRealizada]);

    useEffect(() => {
        if (
            textoDigitado?.trim() !== publicacao.texto?.trim() ||
            (publicacao instanceof PublicacaoModel && midiasDaPublicacao?.length !== publicacao.midiasPublicacao?.length) ||
            novosArquivosSelecionados?.length
        ) {
            setIndicadorAlgumaAlteracaoRealizada(true);
        } else {
            setIndicadorAlgumaAlteracaoRealizada(false);
        }
    }, [textoDigitado, novosArquivosSelecionados, midiasDaPublicacao]);

    function editarPublicacao() {

        setIndicadorEdicaoSendoEnviada(true);

        let idsMidiasExcluidas: Array<number> = [];

        //Se não for uma publicação compartilhada, tira a diferença dos arrays de midias que foram excluídas pelo usuário com as mídias da publicação, e passa passa os ids delas para a variável de ids
        if ((publicacao instanceof PublicacaoModel) && publicacao.midiasPublicacao) {
            const midiasExcluidas = publicacao.midiasPublicacao.filter(
                midia => !midiasDaPublicacao?.includes(midia as never)
            );

            idsMidiasExcluidas = midiasExcluidas.map(midia => midia.id);
        }

        PublicacaoService.editar(textoDigitado, novosArquivosSelecionados, idsMidiasExcluidas, publicacao)
            .then((res) => {

                fecharModal();
                aoEditar(res.data as object);
                setIndicadorEdicaoSendoEnviada(false);

            })
            .catch(() => {
                setIndicadorEdicaoSendoEnviada(false);
            })
    }

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDigitado(e.target.value);
    }

    function excluirMidia(id: number) {
        setMidiasDaPublicacao(state => {
            return state.filter(midia => midia.id !== id);
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

    function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === overlay.current) {
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


            <div id="modalEditarPublicacao__overlay" ref={overlay} onClick={clickOverlay}>
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
                            <TextAreaTamanhoDinamico
                                id='modalEditarPublicacao__campoTexto'
                                placeholder={`No que você está pensando, ${UsuarioService.obtemNomeDoUsuarioLogado()}?`}
                                onChange={aoDigitarTexto}
                                alturaInicial={60}
                                value={textoDigitado ? textoDigitado : ""}
                            />

                            {
                                publicacao instanceof PublicacaoModel &&
                                <div id='modalEditarPublicacao__midiasDaPublicacao'>
                                    <ul id='modalEditarPublicacao__midiasDaPublicacao__listaMidias'>
                                        {
                                            midiasDaPublicacao?.map((midia, index) =>
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
                            }

                            {
                                publicacao instanceof PublicacaoCompartilhadaModel &&
                                <div id='modalCompartilharPublicacao__containerPublicacao'>
                                    <Publicacao
                                        publicacao={publicacao.publicacao}
                                        publicacaoCompartilhada
                                    />
                                </div>
                            }



                            {
                                indicadorInputImagensEVideosAberto &&

                                <SelecionarArquivos
                                    fecharInput={fecharInputImagensEVideos}
                                    setArquivosSelecionados={setNovosArquivosSelecionados}
                                />
                            }
                        </div>

                        {
                            publicacao instanceof PublicacaoModel &&
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
                        }

                        <button
                            id='modalEditarPublicacao__btnSalvar'
                            disabled={!indicadorAlgumaAlteracaoRealizada || indicadorEdicaoSendoEnviada}
                            className={`
                                ${!indicadorAlgumaAlteracaoRealizada ? "modalEditarPublicacao__btnSalvarInativo" : ""} 
                                ${indicadorEdicaoSendoEnviada ? "modalEditarPublicacao__btnSalvarCarregando" : ""}
                            `}
                            onClick={editarPublicacao}
                        >Salvar</button>
                    </div>
                </div>
            </div >
        </>

    )
}
