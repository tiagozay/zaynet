import React, { useEffect, useRef, useState } from 'react';
import './PublicarMobile.css';
import { useNavigate } from 'react-router-dom';
import { ArquivosPublicacaoService } from '../../services/ArquivosPublicacaoService';
import SelecionarArquivos from '../../components/SelecionarArquivos';
import PreviasArquivos from '../../components/SelecionarArquivos/PreviasArquivos';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import UsuarioService from '../../services/UsuarioService';
import { PublicacaoService } from '../../services/PublicacaoService';
import APIResponse from '../../Utils/APIResponse';
import Toast from '../../components/Toast';
import TextAreaTamanhoDinamico from '../../components/TextAreaTamanhoDinamico';

export default function PublicarMobile() {

    const [permisaoParaPublicar, setPermisaoParaPublicar] = useState(false);
    const [indicadorAlgumTextoDigitado, setIndicadorAlgumTextoDigitado] = useState(false);
    const [indicadorAlgumaMidiaSelecionada, setIndicadorAlgumaMidiaSelecionada] = useState(false);
    const [indicadorCadastroSendoEnviado, setIndicadorCadastroSendoEnviado] = useState(false);
    const [indicadorToastAberto, setIndicadorToastAberto] = useState(false);
    const [mensagemToast, setMensagemToast] = useState("");

    const [indicadorInputImagensEVideosAberto, setIndicadorInputImagensEVideosAberto] = useState(false);

    const [textoDigitado, setTextoDigitado] = useState<string | null>(null);
    const [arquivosSelecionados, setArquivosSelecionados] = useState<FileList | null>(null);

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    useEffect(() => {
        if (!isMobile) {
            navigate(-1);
        }
    }, [isMobile]);


    useEffect(() => {
        if (indicadorAlgumTextoDigitado || indicadorAlgumaMidiaSelecionada) {
            setPermisaoParaPublicar(true);
        } else {
            setPermisaoParaPublicar(false);
        }
    }, [indicadorAlgumTextoDigitado, indicadorAlgumaMidiaSelecionada]);

    useEffect(() => {
        if (textoDigitado && textoDigitado.trim().length > 0) {
            setIndicadorAlgumTextoDigitado(true);
        } else {
            setIndicadorAlgumTextoDigitado(false);
        }
    }, [textoDigitado]);

    useEffect(() => {
        if (arquivosSelecionados && arquivosSelecionados.length > 0) {
            setIndicadorAlgumaMidiaSelecionada(true);

        } else {
            setIndicadorAlgumaMidiaSelecionada(false);
        }
    }, [arquivosSelecionados]);

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDigitado(e.target.value);
    }

    function aoClicarEmVoltar() {
        navigate(-1);
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

    async function publicar() {

        setIndicadorCadastroSendoEnviado(true);

        PublicacaoService.publicar(textoDigitado, arquivosSelecionados)
            .then(() => {
                setIndicadorCadastroSendoEnviado(false);
                navigate("/");
            })
            .catch(e => {
                setIndicadorCadastroSendoEnviado(false);

                e.json()
                    .then((res: APIResponse) => abrirToast(res.message));
            })

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
            <div id="publicarMobile__page">
                <div id="publicarMobile__cabecalho">
                    <div id="publicarMobile__cabecalho__container">
                        <button
                            onClick={aoClicarEmVoltar}
                            className='material-symbols-outlined'
                            id='publicarMobile__btnVoltar'
                        >arrow_back</button>
                        <h3 id="publicarMobile__titulo">Criar publicação</h3>
                    </div>
                    <button
                        id="publicarMobile__btnPublicar"
                        disabled={!permisaoParaPublicar || indicadorCadastroSendoEnviado}
                        className={`
                        ${!permisaoParaPublicar ? "publicarMobile__btnPublicarInativo" : ""}
                        ${indicadorCadastroSendoEnviado ? "publicarMobile__btnPublicarCarregando" : ""}
                    `}
                        onClick={publicar}
                    >PUBLICAR</button>
                </div>

                <div id="publicarMobile__container">
                    <div id="publicarMobile__divPerfilENomeUsuario">
                        <img
                            src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
                            alt="Perfil usuário"
                            id="publicarMobile__divPerfilENomeUsuario__perfil"
                        />
                        <p
                            id="publicarMobile__divPerfilENomeUsuario__nome"
                        >Pedro souza</p>
                    </div>

                    <TextAreaTamanhoDinamico
                        id="publicarMobile__campoTexto"
                        placeholder='No que você está pensando, Pedro?'
                        onChange={aoDigitarTexto}
                        alturaInicial={80}
                    />

                    {
                        indicadorInputImagensEVideosAberto &&
                        <SelecionarArquivos
                            fecharInput={fecharInputImagensEVideos}
                            setArquivosSelecionados={setArquivosSelecionados}
                        />
                    }

                </div>

                <div id="publicarMobile__divIconeFotoOuVideo" className={indicadorInputImagensEVideosAberto ? 'displayNone' : ""}>
                    <button onClick={abrirInputImagensEVideos}>
                        <img src="./icones/imagemIcone.png" alt="" />
                    </button>
                </div>

            </div>
        </>

    )
}
