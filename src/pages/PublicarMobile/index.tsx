import React, { useEffect, useRef, useState } from 'react';
import './PublicarMobile.css';
import { useNavigate } from 'react-router-dom';
import { ArquivosPublicacaoService } from '../../services/ArquivosPublicacaoService';
import SelecionarArquivos from '../../components/SelecionarArquivos';
import PreviasArquivos from '../../components/SelecionarArquivos/PreviasArquivos';

export default function PublicarMobile() {

    const [permisaoParaPublicar, setPermisaoParaPublicar] = useState(false);
    const [indicadorAlgumTextoDigitado, setIndicadorAlgumTextoDigitado] = useState(false);
    const [indicadorAlgumaMidiaSelecionada, setIndicadorAlgumaMidiaSelecionada] = useState(false);

    const [indicadorInputImagensEVideosAberto, setIndicadorInputImagensEVideosAberto] = useState(true);

    const [textoDigitado, setTextoDigitado] = useState<string | null>(null);
    const [arquivosSelecionados, setArquivosSelecionados] = useState<FileList | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (indicadorAlgumTextoDigitado || indicadorAlgumaMidiaSelecionada) {
            setPermisaoParaPublicar(true);
        } else {
            setPermisaoParaPublicar(false);
        }
    }, [indicadorAlgumTextoDigitado, indicadorAlgumaMidiaSelecionada]);

    useEffect(() => {
        if (textoDigitado && textoDigitado.length > 0) {
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
        setTextoDigitado(e.target.value.trim());
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

    return (
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
                    disabled={!permisaoParaPublicar}
                    className={!permisaoParaPublicar ? "publicarMobile__btnPublicarInativo" : ""}
                >PUBLICAR</button>
            </div>

            <div id="publicarMobile__container">
                <div id="publicarMobile__divPerfilENomeUsuario">
                    <img
                        src="./imagensDinamicas/perfil.jpg"
                        alt="Perfil usuário"
                        id="publicarMobile__divPerfilENomeUsuario__perfil"
                    />
                    <p
                        id="publicarMobile__divPerfilENomeUsuario__nome"
                    >Tiago zay</p>
                </div>

                <textarea
                    id="publicarMobile__campoTexto"
                    placeholder='No que você está pensando, Tiago?'
                    onChange={aoDigitarTexto}
                >

                </textarea>

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
    )
}
