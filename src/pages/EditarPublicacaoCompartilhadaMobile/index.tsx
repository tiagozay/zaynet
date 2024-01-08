import React, { useEffect, useState } from 'react';
import './EditarPublicacaoCompartilhadaMobile.css';
import Publicacao from '../../components/Publicacao';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import ModalDeConfirmacao from '../../components/ModalDeConfirmacao';

export default function EditarPublicacaoCompartilhadaMobile() {

    //Mock provisório de uma publicação. Posteriormente ela virá do redux ou algo semelhante.
    const publicacao = {
        texto: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, distinctio autem? Magnam autem quisquam voluptates eius cupiditate. Sapiente blanditiis obcaecati natus, similique, repellendus ipsum ipsam dicta eos consequatur, distinctio soluta?",
    }

    const [indicadorModificacaoRealizada, setIndicadorModificacaoRealizada] = useState(false);
    const [modalDeConfirmacaoDeDescarteAberto, setmodalDeConfirmacaoDeDescarteAberto] = useState(false);

    const [textoDaPublicacao, setTextoDaPublicacao] = useState<string | null>(null);

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    useEffect(() => {
        setIndicadorModificacaoRealizada(false);
        setTextoDaPublicacao(publicacao.texto);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            navigate(-1);
        }
    }, [isMobile]);

    useEffect(() => {
        if (
            textoDaPublicacao?.trim() !== publicacao.texto
        ) {
            setIndicadorModificacaoRealizada(true);
        } else {
            setIndicadorModificacaoRealizada(false);
        }
    }, [textoDaPublicacao]);

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDaPublicacao(e.target.value);
    }

    function aoClicarEmVoltar() {
        if (indicadorModificacaoRealizada) {
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
            <div id="editarPublicacaoCompartilhadaMobile__page">
                <div id="editarPublicacaoCompartilhadaMobile__cabecalho">
                    <div id="editarPublicacaoCompartilhadaMobile__cabecalho__container">
                        <button
                            onClick={aoClicarEmVoltar}
                            className='material-symbols-outlined'
                            id='editarPublicacaoCompartilhadaMobile__btnVoltar'
                        >arrow_back</button>
                        <h3 id="editarPublicacaoCompartilhadaMobile__titulo">Editar publicação</h3>
                    </div>
                    <button
                        id="editarPublicacaoCompartilhadaMobile__btnSalvar"
                        disabled={!indicadorModificacaoRealizada}
                        className={!indicadorModificacaoRealizada ? "editarPublicacaoCompartilhadaMobile__btnSalvarInativo" : ""}
                    >SALVAR</button>
                </div>

                <div id="editarPublicacaoCompartilhadaMobile__container">
                    <div id="editarPublicacaoCompartilhadaMobile__divPerfilENomeUsuario">
                        <img
                            src="./imagensDinamicas/perfil.jpg"
                            alt="Perfil usuário"
                            id="editarPublicacaoCompartilhadaMobile__divPerfilENomeUsuario__perfil"
                        />
                        <p
                            id="editarPublicacaoCompartilhadaMobile__divPerfilENomeUsuario__nome"
                        >Pedro souza</p>
                    </div>

                    <textarea
                        id="editarPublicacaoCompartilhadaMobile__campoTexto"
                        placeholder='No que você está pensando, Pedro?'
                        onChange={aoDigitarTexto}
                        value={textoDaPublicacao ? textoDaPublicacao : ""}
                        spellCheck={false}
                    >
                    </textarea>

                    <Publicacao publicacaoCompartilhada />

                </div>
            </div>
        </>

    )
}
