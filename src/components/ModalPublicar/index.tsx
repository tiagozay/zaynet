import React, { useEffect, useRef, useState } from 'react';
import './ModalPublicar.css';
import SelecionarArquivos from '../SelecionarArquivos';
import { ArquivosPublicacaoService } from '../../services/ArquivosPublicacaoService';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import { ArquivoSelecionadoComSuaMiniatura } from '../../models/ArquivoSelecionadoComSuaMiniatura';
import { useMediaQuery } from 'react-responsive';
import UsuarioService from '../../services/UsuarioService';
import { APIService } from '../../services/APIService';
import APIResponse from '../../Utils/APIResponse';
import Toast from '../Toast';
import { useNavigate } from 'react-router-dom';
import { PublicacaoService } from '../../services/PublicacaoService';
import TextAreaTamanhoDinamico from '../TextAreaTamanhoDinamico';

interface ModalPublicarProps {
    modalAberto: boolean,
    fecharModal: () => void
}

export default function ModalPublicar({ modalAberto, fecharModal }: ModalPublicarProps) {

    const [indicadorInputImagensEVideosAberto, setIndicadorInputImagensEVideosAberto] = useState(false);
    const [permisaoParaPublicar, setPermisaoParaPublicar] = useState(false);
    const [indicadorAlgumTextoDigitado, setIndicadorAlgumTextoDigitado] = useState(false);
    const [indicadorAlgumaMidiaSelecionada, setIndicadorAlgumaMidiaSelecionada] = useState(false);
    const [indicadorCadastroSendoEnviado, setIndicadorCadastroSendoEnviado] = useState(false);
    const [indicadorToastAberto, setIndicadorToastAberto] = useState(false);
    const [mensagemToast, setMensagemToast] = useState("");

    const [textoDigitado, setTextoDigitado] = useState<string | null>(null);
    const [arquivosSelecionados, setArquivosSelecionados] = useState<FileList | null>(null);

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    const overlay = useRef(null);

    const navigate = useNavigate();

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

    useEffect(() => {
        if (isMobile) {
            fecharModal();
        }
    }, [isMobile]);

    async function publicar() {

        setIndicadorCadastroSendoEnviado(true);

        PublicacaoService.publicar(textoDigitado, arquivosSelecionados)
            .then(() => {
                setIndicadorCadastroSendoEnviado(false);
                fecharModal();
                navigate("/");
            })
            .catch(e => {
                setIndicadorCadastroSendoEnviado(false);

                e.json()
                    .then((res: APIResponse) => abrirToast(res.message));
            })

    }

    function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === overlay.current) {
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

    function abrirToast(mensagem: string) {
        setIndicadorToastAberto(true);
        setMensagemToast(mensagem);
    }

    function fecharToast() {
        setIndicadorToastAberto(false);
    }

    return (
        <>
            {
                indicadorToastAberto ?
                    <Toast
                        titulo={"Erro ao criar publicação!"}
                        texto={mensagemToast}
                        fechaToast={fecharToast}
                    /> : ""
            }

            <div id="modalPublicar__overlay" ref={overlay} onClick={clickOverlay}>
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
                                src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
                                alt="Perfil usuário"
                                id="modalPublicar__perfilUsuario"
                            />
                            <p id="modalPublicar__nomeUsuario">{UsuarioService.obtemNomeCompletoDoUsuarioLogado()}</p>
                        </div>

                        <div id='modalPublicar__containerInputs'>

                            <TextAreaTamanhoDinamico
                                id='modalPublicar__campoTexto'
                                placeholder='No que você está pensando, Pedro?'
                                onChange={aoDigitarTexto}
                                value={textoDigitado}
                            />

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
                            disabled={!permisaoParaPublicar || indicadorCadastroSendoEnviado}
                            className={`
                            ${!permisaoParaPublicar ? "modalPublicar__btnPublicarInativo" : ""}
                            ${indicadorCadastroSendoEnviado ? "modalPublicar__btnPublicarCarregando" : ""}
                        `}
                            onClick={publicar}
                        >Publicar</button>
                    </div>
                </div>
            </div>
        </>

    )
}
