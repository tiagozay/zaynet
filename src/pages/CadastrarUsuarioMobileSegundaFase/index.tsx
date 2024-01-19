import React, { useContext, useEffect, useState } from 'react';
import './CadastroInformacoesSobreOUsuarioMobile.css';
import { useNavigate } from 'react-router-dom';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import { CadastroUsuarioContext } from '../../contexts/CadastroUsuarioContext';
import { useMediaQuery } from 'react-responsive';
import UsuarioService from '../../services/UsuarioService';
import { LoginService } from '../../services/LoginService';
import APIResponse from '../../Utils/APIResponse';

export default function CadastrarUsuarioMobileSegundaFase() {
    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    const {
        setFasesDoCadastroConcluidas,
        setMensagemDeErroCadastro,
        zerarIndicadoresDeCadastro,
        nome,
        sobrenome,
        email,
        senha,
        dataDeNascimento,
        genero,
        cidadeNatal,
        setCidadeNatal,
        cidadeAtual,
        setCidadeAtual,
        statusDeRelacionamento,
        setStatusDeRelacionamento,
        fotoDoPerfil,
        setFotoDoPerfil,
        fotoDaCapa,
        setFotoDaCapa
    } = useContext(CadastroUsuarioContext);

    const [indicadorPermicaoEnviarFormulario, setIndicadorPermicaoEnviarFormulario] = useState(false);

    const [
        indicadorCadastroSendoEnviado,
        setIndicadorCadastroSendoEnviado
    ] = useState(false);


    useEffect(() => {
        if (
            cidadeNatal.trim().length > 0 &&
            cidadeAtual.trim().length > 0 &&
            statusDeRelacionamento.trim().length > 0
        ) {
            setIndicadorPermicaoEnviarFormulario(true);
        } else {
            setIndicadorPermicaoEnviarFormulario(false);
        }
    }, [cidadeNatal, cidadeAtual, statusDeRelacionamento, fotoDoPerfil, fotoDaCapa]);

    useEffect(() => {
        if (!isMobile) {
            navigate('/login');
        }
    }, [isMobile]);

    function clickVoltar() {
        setFasesDoCadastroConcluidas(0);
        navigate('/login');
    }

    function clickCadastrar() {
        setIndicadorCadastroSendoEnviado(true);

        UsuarioService.cadastraUsuario(
            nome,
            sobrenome,
            email,
            senha,
            dataDeNascimento,
            genero,
            cidadeNatal,
            cidadeAtual,
            statusDeRelacionamento,
            fotoDoPerfil,
            fotoDaCapa
        )
        .then(dataLogin => {

            setIndicadorCadastroSendoEnviado(false);

            const token = dataLogin.token;

            const usuario = dataLogin.usuario;

            LoginService.armazenaInfoLogin(token, usuario);

            navigate('/');
        })
        .catch((res: APIResponse) => {

            setIndicadorCadastroSendoEnviado(false);
            zerarIndicadoresDeCadastro();

            if(res.domainError){
                abrirToast(res.message);
            }else{
                abrirToast("Erro inesperado ao criar conta");
            }

            navigate('/login');
         });

    }

    function abrirToast(texto: string){
        setMensagemDeErroCadastro(texto);
    }

    function handleChangeCidadeNatal(e: React.ChangeEvent<HTMLInputElement>) {
        setCidadeNatal(e.target.value);
    }

    function handleChangeCidadeAtual(e: React.ChangeEvent<HTMLInputElement>) {
        setCidadeAtual(e.target.value);
    }

    function handleStatusDeRelacionamento(e: React.ChangeEvent<HTMLSelectElement>) {
        setStatusDeRelacionamento(e.target.value);
    }

    function handleChangeFotoDoPerfil(e: React.ChangeEvent<HTMLInputElement>) {
        const arquivosSelecionados = e.target.files as FileList;
        setFotoDoPerfil(arquivosSelecionados[0]);
    }

    function handleChangeFotoDeCapa(e: React.ChangeEvent<HTMLInputElement>) {
        const arquivosSelecionados = e.target.files as FileList;
        setFotoDaCapa(arquivosSelecionados[0]);
    }

    return (
        <section id="cadastrarUsuarioMobilePage">
            <div id='cadastrarUsuarioMobile__divTituloEBtnVoltar'>
                <button className='material-symbols-outlined' id='cadastrarUsuarioMobile__btnVoltar' onClick={clickVoltar}>
                    arrow_back_ios
                </button>
                <h3 id='cadastrarUsuarioMobile__titulo'>
                    Informações sobre
                </h3>
            </div>
            <form id='cadastrarUsuarioMobile__formulario'>

                <input type="text" placeholder='Cidade natal' value={cidadeNatal} onChange={handleChangeCidadeNatal} />
                <input type="text" placeholder='Cidade atual' value={cidadeAtual} onChange={handleChangeCidadeAtual} />

                <label id='modalInformacoesSobreOUsuario__labelStatusRelacionamento'>
                    Status de relacionamento
                    <select id="selectStatusDeRelacionamento" value={statusDeRelacionamento} onChange={handleStatusDeRelacionamento}>
                        <option value="" disabled>SELECIONE</option>
                        <option value="Solteiro">Solteiro</option>
                        <option value="Namorando">Namorando</option>
                        <option value="Noivo">Noivo</option>
                        <option value="Casado">Casado</option>
                        <option value="Separado">Separado</option>
                        <option value="Viúvo">Viúvo</option>
                    </select>
                </label>

                <label>
                    Foto do perfil (opcional)
                    <input type="file" onChange={handleChangeFotoDoPerfil} />
                </label>

                <label>
                    Foto da capa (opcional)
                    <input type="file" onChange={handleChangeFotoDeCapa} />
                </label>

                <button
                    type='button'
                    id='cadastrarUsuarioMobileSegundaFase__btnCadastrar'
                    className={`
                        ${!indicadorPermicaoEnviarFormulario ?
                            'cadastrarUsuarioMobileSegundaFase__btnCadastrarDesativado' :
                            ''
                        }
                        ${indicadorCadastroSendoEnviado ? 'cadastrarUsuarioMobileSegundaFase__btnCadastrarCarregando' :
                            ''
                        }
                    `
                    }
                    onClick={clickCadastrar}
                    disabled={!indicadorPermicaoEnviarFormulario || indicadorCadastroSendoEnviado}
                >Finalizar cadastro</button>
            </form>
        </section>
    )
}
