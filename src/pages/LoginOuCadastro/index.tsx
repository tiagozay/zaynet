import React, { useContext, useEffect, useState } from 'react';
import './LoginOuCadastro.css';
import { CadastroUsuarioContext } from '../../contexts/CadastroUsuarioContext';
import CadastrarUsuario from '../../components/CadastrarUsuario';
import { APIService } from '../../services/APIService';
import { LoginService } from '../../services/LoginService';
import APIResponse from '../../Utils/APIResponse';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';

export default function LoginOuCadastro() {
    const {
        indicadorCadastroUsuarioAberto,
        setIndicadorCadastroUsuarioAberto,
    } = useContext(CadastroUsuarioContext);

    const [mensagemDeErro, setMensagemDeErro] = useState<string | null>(null);
    const [indicadorLoginSendoEnviado, setIndicadorLoginSendoEnviado] = useState(false);
    const [indicadorToastAberto, setIndicadorToastAberto] = useState(false);
    const [tituloToast, setTituloToast] = useState("");
    const [textoToast, setTextoToast] = useState("");

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [exibirSenha, setExibirSenha] = useState(false);

    const {mensagemDeErroCadastro} = useContext(CadastroUsuarioContext);

    const navigate = useNavigate();

    useEffect(() => {
        LoginService.verificaSeHaLoginValido()
            .then(loginValido => {
                if (loginValido) {
                    navigate('/');
                }
            });
    }, []);

    useEffect(() => {
        if(mensagemDeErroCadastro){
            abrirToast(
                "Erro ao cadastrar usuário!",
                mensagemDeErroCadastro
            );
        }
    }, [mensagemDeErroCadastro]);

    function handleExibirSenha() {
        setExibirSenha(state => !state);
    }

    function abrirModalCadastrarUsuario() {
        setIndicadorCadastroUsuarioAberto(true);
    }

    function fecharCadastroUsuario() {
        setIndicadorCadastroUsuarioAberto(false);
    }

    function aoDigitarEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function aoDigitarSenha(e: React.ChangeEvent<HTMLInputElement>) {
        setSenha(e.target.value);
    }

    function aoEnviarLogin() {

        if (email.trim().length === 0 || senha.trim().length === 0) {
            setMensagemDeErro("E-mail ou senha inválidos!");
            return;
        }

        setIndicadorLoginSendoEnviado(true);

        APIService.post('login', { email, senha })
            .then(res => {
                setIndicadorLoginSendoEnviado(false);

                if (res.data && 'dataLogin' in res.data) {

                    const token = res.data.dataLogin.token;

                    const usuario = res.data.dataLogin.usuario;

                    LoginService.armazenaInfoLogin(token, usuario);

                    navigate('/');

                }
            })
            .catch(res => {
                setIndicadorLoginSendoEnviado(false);

                res.json()
                    .then((res: APIResponse) => {
                        if (res.domainError) {
                            setMensagemDeErro(res.message);
                        }
                    });
            });
    }

    function abrirToast(titulo: string, texto: string)
    {
        setIndicadorToastAberto(true);
        setTituloToast(titulo);
        setTextoToast(texto);
    }

    function fecharToast()
    {
        setIndicadorToastAberto(false);
        setTituloToast("");
        setTextoToast("");
    }

    return (
        <>
            {
                indicadorToastAberto ?
                    <Toast
                        titulo={tituloToast}
                        texto={textoToast}
                        fechaToast={fecharToast}
                    /> : ""
            }
            {
                indicadorCadastroUsuarioAberto ?
                    <CadastrarUsuario
                        fecharCadastro={fecharCadastroUsuario}
                        modalAberto={indicadorCadastroUsuarioAberto}
                    />
                    : ""
                }

            <section id='sectionLoginOuCadastroPage'>
                <form id='formularioDeLogin'>

                    {
                        mensagemDeErro ?
                            <p id='formularioDeLogin__mensagemDeErro'>
                                {mensagemDeErro}
                            </p> : ""
                    }

                    <input type="email" placeholder='E-mail' onChange={aoDigitarEmail} value={email} />
                    <div id='divInputSenha' className='divInputSenhaLogin'>
                        <input type={exibirSenha ? "text" : "password"} placeholder='Senha' onChange={aoDigitarSenha} value={senha} />
                        <button type='button' className='material-symbols-outlined' onClick={handleExibirSenha}>
                            {exibirSenha ? 'visibility_off' : 'visibility'}
                        </button>
                    </div>
                    <button
                        type='button'
                        id='btnLogin'
                        className={indicadorLoginSendoEnviado ? 'btnLoginCaregando' : ""}
                        onClick={aoEnviarLogin}
                    >Entrar</button>
                    <button type='button' id='btnEsqueceuASenha'>Esqueceu a senha?</button>
                    <hr id='linhaDivisoria' />
                    <button type='button' id='btnCriarNovaConta' onClick={abrirModalCadastrarUsuario}>
                        Criar nova conta
                    </button>
                </form>
            </section>
        </>

    )
}
