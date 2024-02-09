import React, { useContext, useEffect, useRef, useState } from 'react';
import './EditarPerfilMobile.css';
import { useNavigate } from 'react-router-dom';
import { ArquivosPublicacaoService } from '../../services/ArquivosPublicacaoService';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import ModalDeConfirmacao from '../../components/ModalDeConfirmacao';
import { ControleLoginContext } from '../../contexts/ControleLoginContext';
import { LoginService } from '../../services/LoginService';

export default function EditarPerfilMobile() {

    //Mocks provisórios que indicam se existe foto de capa ou perfil, já que elas não são obrigatórias. Futuramente estes dados virão do back-end
    const indicadorExisteFotoDaCapa = true;
    const indicadorExisteFotoDoPerfil = true;

    const informacoesUsuario = {
        fotoPerfil: './imagensDinamicas/perfil.jpg',
        fotoCapa: './imagensDinamicas/perfil.jpg',
        nome: "Pedro",
        sobrenome: "Souza",
        dataDeNascimento: "1970-08-20",
        genero: "Masculino",
        cidadeNatal: "São paulo",
        cidadeAtual: "Cruz machado",
        statusDeRelacionamento: "Solteiro",
    }

    const [novaFotoPerfil, setNovaFotoPerfil] = useState<File | null>(null);
    const [novaFotoCapa, setNovaFotoCapa] = useState<File | null>(null);
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [dataDeNascimento, setDataDeNascimento] = useState("");
    const [genero, setGenero] = useState("");
    const [cidadeNatal, setCidadeNatal] = useState("");
    const [cidadeAtual, setCidadeAtual] = useState("");
    const [statusDeRelacionamento, setStatusDeRelacionamento] = useState("");

    const [novaFotoPerfilPrevia64, setNovaFotoPerfilPrevia64] = useState<string | null>(null);
    const [novaFotoCapaPrevia64, setNovaFotoCapaPrevia64] = useState<string | null>(null);

    const [indicadorModificacaoRealizada, setIndicadorModificacaoRealizada] = useState(false);
    const [modalDeConfirmacaoDeDescarteAberto, setmodalDeConfirmacaoDeDescarteAberto] = useState(false);

    const { permisaoParaIniciar, setPermisaoParaIniciar } = useContext(ControleLoginContext);

    const inputPerfilRef = useRef<HTMLInputElement | null>(null);
    const inputCapaRef = useRef<HTMLInputElement | null>(null);

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    const navigate = useNavigate();

    useEffect(() => {
        setNome(informacoesUsuario.nome);
        setSobrenome(informacoesUsuario.sobrenome);
        setDataDeNascimento(informacoesUsuario.dataDeNascimento);
        setGenero(informacoesUsuario.genero);
        setCidadeNatal(informacoesUsuario.cidadeNatal);
        setCidadeAtual(informacoesUsuario.cidadeAtual);
        setStatusDeRelacionamento(informacoesUsuario.statusDeRelacionamento);
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
        if (
            novaFotoPerfil !== null ||
            novaFotoCapa !== null ||
            nome !== informacoesUsuario.nome ||
            sobrenome !== informacoesUsuario.sobrenome ||
            dataDeNascimento !== informacoesUsuario.dataDeNascimento ||
            genero !== informacoesUsuario.genero ||
            cidadeNatal !== informacoesUsuario.cidadeNatal ||
            cidadeAtual !== informacoesUsuario.cidadeAtual ||
            statusDeRelacionamento !== informacoesUsuario.statusDeRelacionamento
        ) {
            setIndicadorModificacaoRealizada(true);
        } else {
            setIndicadorModificacaoRealizada(false);
        }
    }, [
        novaFotoPerfil,
        novaFotoCapa,
        nome,
        sobrenome,
        dataDeNascimento,
        genero,
        cidadeNatal,
        cidadeAtual,
        statusDeRelacionamento
    ]);
    

    useEffect(() => {
        if (novaFotoPerfil) {
            ArquivosPublicacaoService.transformaFileEmBase64(novaFotoPerfil)
                .then(src => setNovaFotoPerfilPrevia64(src));
        } else {
            setNovaFotoPerfilPrevia64(null);
        }
    }, [novaFotoPerfil]);

    useEffect(() => {
        if (novaFotoCapa) {
            ArquivosPublicacaoService.transformaFileEmBase64(novaFotoCapa)
                .then(src => setNovaFotoCapaPrevia64(src));
        } else {
            setNovaFotoCapaPrevia64(null);
        }
    }, [novaFotoCapa]);

    useEffect(() => {
        if (!isMobile) {
            navigate(-1);
        }
    }, [isMobile]);


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

    function clickEditarPerfil() {
        inputPerfilRef.current?.click();
    }

    function clickEditarCapa() {
        inputCapaRef.current?.click();
    }

    function aoSelecionarNovoPerfil(e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files as FileList;
        setNovaFotoPerfil(fileList[0]);
    }

    function aoSelecionarNovaCapa(e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files as FileList;
        setNovaFotoCapa(fileList[0]);
    }

    function aoDigitarNome(e: React.ChangeEvent<HTMLInputElement>) {
        setNome(e.target.value);
    }

    function aoDigitarSobrenome(e: React.ChangeEvent<HTMLInputElement>) {
        setSobrenome(e.target.value);
    }

    function aoDigitarDataDeNascimento(e: React.ChangeEvent<HTMLInputElement>) {
        setDataDeNascimento(e.target.value);
    }

    function aoSelecionarGenero(e: React.ChangeEvent<HTMLInputElement>) {
        setGenero(e.target.value);
    }

    function aoDigitarCidadeNatal(e: React.ChangeEvent<HTMLInputElement>) {
        setCidadeNatal(e.target.value);
    }

    function aoDigitarCidadeAtual(e: React.ChangeEvent<HTMLInputElement>) {
        setCidadeAtual(e.target.value);
    }

    function aoSelecionarStatusDeRelacionamento(e: React.ChangeEvent<HTMLSelectElement>) {
        setStatusDeRelacionamento(e.target.value);
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

            <div id="editarPerfilMobile__page">
                <div id="editarPerfilMobile__cabecalho">
                    <div id="editarPerfilMobile__cabecalho__container">
                        <button
                            onClick={aoClicarEmVoltar}
                            className='material-symbols-outlined'
                            id='editarPerfilMobile__btnVoltar'
                        >arrow_back</button>
                        <h3 id="editarPerfilMobile__titulo">Editar perfil</h3>
                    </div>
                    <button
                        id="editarPerfilMobile__btnSalvar"
                        disabled={!indicadorModificacaoRealizada}
                        className={!indicadorModificacaoRealizada ? "editarPerfilMobile__btnSalvarInativo" : ""}
                    >SALVAR</button>
                </div>

                <div id='editarPerfilMobile__container'>

                    <div id='editarPerfilMobile__container__inputs'>
                        <div id='editarPerfilMobile__divCampoImagem'>
                            <div id='editarPerfilMobile__divCampoImagem__tituloEBtnDeEditar'>
                                <h3 id='editarPerfilMobile__tituloEBtnDeEditar__titulo'>Foto do perfil</h3>
                                <button id='editarPerfilMobile__tituloEBtnDeEditar__btnEditar' onClick={clickEditarPerfil}>
                                    Editar
                                </button>
                            </div>
                            <input type="file" hidden ref={inputPerfilRef} onChange={aoSelecionarNovoPerfil} />
                            {
                                indicadorExisteFotoDoPerfil ?
                                    <img
                                        src={novaFotoPerfilPrevia64 ? novaFotoPerfilPrevia64 : informacoesUsuario.fotoPerfil}
                                        alt="Imagem perfil"
                                        id='editarPerfilMobile__divCampoImagem__perfil'
                                    /> :
                                    <div id='editarPerfilMobile__divCampoImagem__perfil'>

                                    </div>
                            }
                        </div>

                        <div id='editarPerfilMobile__divCampoImagem'>
                            <div id='editarPerfilMobile__divCampoImagem__tituloEBtnDeEditar'>
                                <h3 id='editarPerfilMobile__tituloEBtnDeEditar__titulo'>Foto da capa</h3>
                                <button id='editarPerfilMobile__tituloEBtnDeEditar__btnEditar' onClick={clickEditarCapa}>
                                    Editar
                                </button>
                            </div>
                            <input type="file" hidden ref={inputCapaRef} onChange={aoSelecionarNovaCapa} />
                            {
                                indicadorExisteFotoDaCapa ?
                                    <img
                                        src={novaFotoCapaPrevia64 ? novaFotoCapaPrevia64 : informacoesUsuario.fotoCapa}
                                        alt="Imagem capa"
                                        id='editarPerfilMobile__divCampoImagem__capa'
                                    /> :
                                    <div id='editarPerfilMobile__divCampoImagem__capa'>

                                    </div>
                            }
                        </div>

                        <div id='editarPerfilMobile__divCampoTexto'>
                            <label
                                id='editarPerfilMobile__divCampoTextoLabel'
                                htmlFor='editarPerfilMobile__divCampoTextoInput'
                            >Nome</label>
                            <input type="text" id='editarPerfilMobile__divCampoTextoInput' onChange={aoDigitarNome} value={nome} />
                        </div>

                        <div id='editarPerfilMobile__divCampoTexto'>
                            <label
                                id='editarPerfilMobile__divCampoTextoLabel'
                                htmlFor='editarPerfilMobile__divCampoTextoInput'
                            >Sobrenome</label>
                            <input type="text" id='editarPerfilMobile__divCampoTextoInput' onChange={aoDigitarSobrenome} value={sobrenome} />
                        </div>

                        <div id='editarPerfilMobile__divCampoTexto'>
                            <label
                                id='editarPerfilMobile__divCampoTextoLabel'
                                htmlFor='editarPerfilMobile__divCampoTextoInput'
                            >Data de nascimento</label>
                            <input type="date" id='editarPerfilMobile__divCampoTextoInput' onChange={aoDigitarDataDeNascimento} value={dataDeNascimento} />
                        </div>

                        <div id='editarPerfilMobile__divCampoTexto'>
                            <label
                                id='editarPerfilMobile__divCampoTextoLabel'
                                htmlFor='editarPerfilMobile__divCampoTextoInput'
                            >Gênero</label>

                            <div id='editarPerfilMobile__divInputsRadio'>
                                <label id='editarPerfilMobile__labelInputRadioGenero'>
                                    Feminino
                                    <input type="radio" name='editarPerfil__genero' value="Feminino" checked={genero === "Feminino"} onChange={aoSelecionarGenero} />
                                </label>

                                <label id='editarPerfilMobile__labelInputRadioGenero'>
                                    Masculino
                                    <input type="radio" name='editarPerfil__genero' value="Masculino" checked={genero === "Masculino"} onChange={aoSelecionarGenero} />
                                </label>
                            </div>
                        </div>
                        <div id='editarPerfilMobile__divCampoTexto'>
                            <label
                                id='editarPerfilMobile__divCampoTextoLabel'
                                htmlFor='editarPerfilMobile__divCampoTextoInput'
                            >Cidade natal</label>
                            <input type="text" id='editarPerfilMobile__divCampoTextoInput' value={cidadeNatal} onChange={aoDigitarCidadeNatal} />
                        </div>

                        <div id='editarPerfilMobile__divCampoTexto'>
                            <label
                                id='editarPerfilMobile__divCampoTextoLabel'
                                htmlFor='editarPerfilMobile__divCampoTextoInput'
                            >Cidade atual</label>
                            <input type="text" id='editarPerfilMobile__divCampoTextoInput' value={cidadeAtual} onChange={aoDigitarCidadeAtual} />
                        </div>

                        <div id='editarPerfilMobile__divCampoTexto'>
                            <label
                                id='editarPerfilMobile__divCampoTextoLabel'
                                htmlFor='editarPerfilMobile__divCampoTextoInput'
                            >Status de relacionamento</label>
                            <select id='editarPerfilMobile__divCampoTextoSelect' value={statusDeRelacionamento} onChange={aoSelecionarStatusDeRelacionamento} >
                                <option value="Solteiro">Solteiro</option>
                                <option value="Namorando">Namorando</option>
                                <option value="Noivo">Noivo</option>
                                <option value="Casado">Casado</option>
                                <option value="Separado">Separado</option>
                                <option value="Viúvo">Viúvo</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}
