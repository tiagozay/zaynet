import React, { useEffect, useState } from 'react';
import './ModalEditarPublicacaoCompartilhada.css';
import ModalDeConfirmacao from '../ModalDeConfirmacao';
import Publicacao from '../Publicacao';
import UsuarioService from '../../services/UsuarioService';

interface ModalEditarPublicacaoCompatilhadaProps {
    modalAberto: boolean,
    fecharModal: () => void
}

export default function ModalEditarPublicacaoCompartilhada({ modalAberto, fecharModal }: ModalEditarPublicacaoCompatilhadaProps) {

    //Mock provisório de uma publicação. Posteriormente ela virá do redux ou algo semelhante.
    const publicacao = {
        texto: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, distinctio autem? Magnam autem quisquam voluptates eius cupiditate. Sapiente blanditiis obcaecati natus, similique, repellendus ipsum ipsam dicta eos consequatur, distinctio soluta?"
    }

    const [indicadorAlgumaAlteracaoRealizada, setIndicadorAlgumaAlteracaoRealizada] = useState(false);

    const [textoDaPublicacao, setTextoDaPublicacao] = useState<string | null>(null);

    const [indicadorModalConfirmacaoDescartarAberto, setIndicadorModalConfirmacaoDescartarAberto] = useState(false);

    //Este useEffect é responsável por resetar os estados toda vez que o modal for re-aberto.
    useEffect(() => {
        setIndicadorAlgumaAlteracaoRealizada(false);
        setTextoDaPublicacao(publicacao.texto);
    }, [modalAberto]);

    useEffect(() => {
        if (
            textoDaPublicacao?.trim() !== publicacao.texto
        ) {
            setIndicadorAlgumaAlteracaoRealizada(true);
        } else {
            setIndicadorAlgumaAlteracaoRealizada(false);
        }
    }, [textoDaPublicacao]);

    function publicar() {

    }

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDaPublicacao(e.target.value);
    }

    function aoConfirmarDescartarAlteracoes() {
        fecharModal();
    }

    function fecharModalConfirmacaoDescartar() {
        setIndicadorModalConfirmacaoDescartarAberto(false);
    }

    function clickFechar() {

        if (indicadorAlgumaAlteracaoRealizada) {
            setIndicadorModalConfirmacaoDescartarAberto(true);
        } else {
            fecharModal();
        }
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


            <div id="modalEditarPublicacaoCompartilhada__overlay">
                <div id="modalEditarPublicacaoCompartilhada">
                    <div id='modalEditarPublicacaoCompartilhada__tituloEBtnDeFechar'>
                        <h3 id='modalEditarPublicacaoCompartilhada__tituloModal'>Editar publicação</h3>
                        <button
                            id='modalEditarPublicacaoCompartilhada__btnFechar'
                            className='material-symbols-outlined'
                            onClick={clickFechar}
                        >close</button>
                    </div>
                    <div id='modalEditarPublicacaoCompartilhada__container'>
                        <div id="modalEditarPublicacaoCompartilhada__nomeEPerfilDoUsuario">
                            <img
                                src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
                                alt="Perfil usuário"
                                id="modalEditarPublicacaoCompartilhada__perfilUsuario"
                            />
                            <p id="modalEditarPublicacaoCompartilhada__nomeUsuario">{UsuarioService.obtemNomeCompletoDoUsuarioLogado()}</p>
                        </div>

                        <div id='modalEditarPublicacaoCompartilhada__containerInputs'>
                            <textarea
                                id='modalEditarPublicacaoCompartilhada__campoTexto'
                                className="modalEditarPublicacaoCompartilhada__campoTextoMaisBaixo"
                                value={textoDaPublicacao ? textoDaPublicacao : ""}
                                placeholder='No que você está pensando, Pedro?'
                                onChange={aoDigitarTexto}
                                spellCheck={false}
                            ></textarea>

                            <div id='modalEditarPublicacaoCompartilhada__containerPublicacao'>
                                <Publicacao publicacaoCompartilhada />
                            </div>

                        </div>
                        <button
                            id='modalEditarPublicacaoCompartilhada__btnSalvar'
                            disabled={!indicadorAlgumaAlteracaoRealizada}
                            className={!indicadorAlgumaAlteracaoRealizada ? "modalEditarPublicacaoCompartilhada__btnSalvarInativo" : ""}
                            onClick={publicar}
                        >Salvar</button>
                    </div>
                </div>
            </div>
        </>
    )
}
