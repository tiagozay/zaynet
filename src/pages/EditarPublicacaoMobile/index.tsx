import React, { useContext, useEffect, useState } from 'react';
import './EditarPublicacaoMobile.css';
import { useNavigate } from 'react-router-dom';
import SelecionarArquivos from '../../components/SelecionarArquivos';
import { MidiaPublicacaoModel } from '../../models/Publicacao/MidiaPublicacaoModel';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import MidiaEditarPublicacao from '../../components/MidiaEditarPublicacao';
import ModalDeConfirmacao from '../../components/ModalDeConfirmacao';
import UsuarioService from '../../services/UsuarioService';
import TextAreaTamanhoDinamico from '../../components/TextAreaTamanhoDinamico';
import { ControleLoginContext } from '../../contexts/ControleLoginContext';
import { LoginService } from '../../services/LoginService';
import { EditarPublicacaoContext } from '../../contexts/EditarPublicacaoContext';
import { PublicacaoModel } from '../../models/Publicacao/PublicacaoModel';
import { PublicacaoCompartilhadaModel } from '../../models/Publicacao/PublicacaoCompartilhadaModel';
import Publicacao from '../../components/Publicacao';

export default function EditarPublicacaoMobile() {

    const {
        publicacaoEditada,
        textoDigitado,
        setTextoDigitado,
        midiasDaPublicacao, 
        setMidiasDaPublicacao
    } = useContext(EditarPublicacaoContext);

    const [indicadorInputImagensEVideosAberto, setIndicadorInputImagensEVideosAberto] = useState(false);
    const [indicadorAlteracaoRealizada, setIndicadorAlteracaoRealizada] = useState(false);
    const [modalDeConfirmacaoDeDescarteAberto, setmodalDeConfirmacaoDeDescarteAberto] = useState(false);

    const { permisaoParaIniciar, setPermisaoParaIniciar } = useContext(ControleLoginContext);

    const [novosArquivosSelecionados, setNovosArquivosSelecionados] = useState<FileList | null>(null);

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    const navigate = useNavigate();

    useEffect(() => {
        setIndicadorInputImagensEVideosAberto(false);
        setIndicadorAlteracaoRealizada(false);

        setTextoDigitado(publicacaoEditada?.texto ? publicacaoEditada?.texto : null);

        if (publicacaoEditada instanceof PublicacaoModel) {
            setMidiasDaPublicacao(publicacaoEditada.midiasPublicacao);
        }

        setNovosArquivosSelecionados(null);
    }, []);

    useEffect(() => {
        LoginService.verificaSeHaLoginValido()
            .then(loginValido => {
                if (loginValido) {
                    setPermisaoParaIniciar(true);
                } else {
                    navigate('/login');
                }
            })
            .catch(() => { })
    }, [permisaoParaIniciar]);

    useEffect(() => {
        if (!isMobile) {
            navigate(-1);
        }
    }, [isMobile]);

    useEffect(() => {
        if (
            textoDigitado?.trim() !== publicacaoEditada?.texto ||
            (publicacaoEditada instanceof PublicacaoModel && midiasDaPublicacao?.length !== publicacaoEditada.midiasPublicacao?.length) ||
            novosArquivosSelecionados?.length
        ) {
            setIndicadorAlteracaoRealizada(true);
        } else {
            setIndicadorAlteracaoRealizada(false);
        }
    }, [textoDigitado, midiasDaPublicacao, novosArquivosSelecionados]);

    if (publicacaoEditada === null) {
        throw new Error("Nenhuma publicação recebida");
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
        permisaoParaIniciar &&
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
                            src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
                            alt="Perfil usuário"
                            id="editarPublicacaoMobile__divPerfilENomeUsuario__perfil"
                        />
                        <p
                            id="editarPublicacaoMobile__divPerfilENomeUsuario__nome"
                        >Pedro souza</p>
                    </div>

                    <TextAreaTamanhoDinamico
                        id="editarPublicacaoMobile__campoTexto"
                        placeholder='No que você está pensando, Pedro?'
                        onChange={aoDigitarTexto}
                        value={textoDigitado ? textoDigitado : ""}
                        alturaInicial={80}
                    />

                    {
                        publicacaoEditada instanceof PublicacaoModel &&
                        <div id='editarPublicacaoMobile__midiasDaPublicacao'>
                            <ul id='editarPublicacaoMobile__midiasDaPublicacao__listaMidias'>
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
                        publicacaoEditada instanceof PublicacaoCompartilhadaModel &&
                        <div id='modalCompartilharPublicacao__containerPublicacao'>
                            <Publicacao
                                publicacao={publicacaoEditada.publicacao}
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
                    publicacaoEditada instanceof PublicacaoModel &&
                    <div id="editarPublicacaoMobile__divIconeFotoOuVideo" className={indicadorInputImagensEVideosAberto ? 'displayNone' : ""}>
                        <button onClick={abrirInputImagensEVideos}>
                            <img src="./icones/imagemIcone.png" alt="" />
                        </button>
                    </div>
                }

            </div>
        </>

    )
}
