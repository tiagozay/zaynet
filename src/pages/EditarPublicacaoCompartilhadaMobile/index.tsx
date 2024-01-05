import React, { useEffect, useState } from 'react';
import './EditarPublicacaoCompartilhadaMobile.css';
import Publicacao from '../../components/Publicacao';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';

export default function EditarPublicacaoCompartilhadaMobile() {

    //Mock provisório de uma publicação. Posteriormente ela virá do redux ou algo semelhante.
    const publicacao = {
        texto: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, distinctio autem? Magnam autem quisquam voluptates eius cupiditate. Sapiente blanditiis obcaecati natus, similique, repellendus ipsum ipsam dicta eos consequatur, distinctio soluta?",
    }

    const [permisaoParaSalvarAlteracoes, setPermisaoParaSalvarAlteracoes] = useState(false);

    const [textoDaPublicacao, setTextoDaPublicacao] = useState<string | null>(null);

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    useEffect(() => {
        setPermisaoParaSalvarAlteracoes(false);
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
            setPermisaoParaSalvarAlteracoes(true);
        } else {
            setPermisaoParaSalvarAlteracoes(false);
        }
    }, [textoDaPublicacao]);

    function aoDigitarTexto(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextoDaPublicacao(e.target.value);
    }

    function aoClicarEmVoltar() {
        navigate(-1);
    }

    return (
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
                    disabled={!permisaoParaSalvarAlteracoes}
                    className={!permisaoParaSalvarAlteracoes ? "editarPublicacaoCompartilhadaMobile__btnSalvarInativo" : ""}
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

                <Publicacao publicacaoCompartilhada/>

            </div>
        </div>
    )
}
