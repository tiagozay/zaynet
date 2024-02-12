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

interface ModalEditarPublicacaoProps {
    publicacao: PublicacaoModel | PublicacaoCompartilhadaModel,
    modalAberto: boolean,
    fecharModal: () => void
}

export default function ModalEditarPublicacao({ publicacao, modalAberto, fecharModal }: ModalEditarPublicacaoProps) {

    const {
        textoDigitado,
        setTextoDigitado,
        midiasDaPublicacao,
        setMidiasDaPublicacao
    } = useContext(EditarPublicacaoContext);

    const [indicadorInputImagensEVideosAberto, setIndicadorInputImagensEVideosAberto] = useState(false);
    const [indicadorAlgumaAlteracaoRealizada, setIndicadorAlgumaAlteracaoRealizada] = useState(false);

    const [novosArquivosSelecionados, setNovosArquivosSelecionados] = useState<FileList | null>(null);

    const [indicadorModalConfirmacaoDescartarAberto, setIndicadorModalConfirmacaoDescartarAberto] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    //Este useEffect é responsável por resetar os estados toda vez que o modal for re-aberto.
    useEffect(() => {

        setIndicadorInputImagensEVideosAberto(false);
        setIndicadorAlgumaAlteracaoRealizada(false);
        setTextoDigitado(publicacao.texto);

        if (publicacao instanceof PublicacaoModel) {
            setMidiasDaPublicacao(publicacao.midiasPublicacao);
        }


        setNovosArquivosSelecionados(null);
    }, [modalAberto]);

    useEffect(() => {
        if (isMobile) {
            fecharModal();
        }
    }, [isMobile]);

    useEffect(() => {
        if (
            textoDigitado?.trim() !== publicacao.texto ||
            (publicacao instanceof PublicacaoModel && midiasDaPublicacao?.length !== publicacao.midiasPublicacao?.length) ||
            novosArquivosSelecionados?.length
        ) {
            setIndicadorAlgumaAlteracaoRealizada(true);
        } else {
            setIndicadorAlgumaAlteracaoRealizada(false);
        }
    }, [textoDigitado, midiasDaPublicacao, novosArquivosSelecionados]);

    function publicar() {

    }

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDigitado(e.target.value);
    }

    //Função provísória que serve para excluir imagens do array. Quando esta parte for integrada com o back-end a implementação dela pode mudar. Esta serve apenas para modificar o estado e identificar a mudança.
    function excluirMidia(indice: number) {
        setMidiasDaPublicacao(state => {
            // return state.filter((midia, index) => indice !== index);
            return [];
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
                            <TextAreaTamanhoDinamico
                                id='modalEditarPublicacao__campoTexto'
                                placeholder='No que você está pensando, Pedro?'
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
                            disabled={!indicadorAlgumaAlteracaoRealizada}
                            className={!indicadorAlgumaAlteracaoRealizada ? "modalEditarPublicacao__btnSalvarInativo" : ""}
                            onClick={publicar}
                        >Salvar</button>
                    </div>
                </div>
            </div >
        </>

    )
}
