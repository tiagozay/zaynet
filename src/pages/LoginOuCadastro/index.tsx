import React, { useContext, useEffect, useState } from 'react';
import './LoginOuCadastro.css';
import { CadastroUsuarioContext } from '../../contexts/CadastroUsuarioContext';
import CadastrarUsuario from '../../components/CadastrarUsuario';
import { APIService } from '../../services/APIService';

export default function LoginOuCadastro() {
    const {
        indicadorCadastroUsuarioAberto,
        setIndicadorCadastroUsuarioAberto,
    } = useContext(CadastroUsuarioContext);

    const [mensagemDeErro, setMensagemDeErro] = useState<string | null>(null);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [exibirSenha, setExibirSenha] = useState(false);

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
        APIService.post('login', {email, senha})
        .then( res => console.log(res) )
        .catch( res => {
            if(res.domainError){
                setMensagemDeErro(res.message);
            }
        } )
    }

    return (
        <>

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
                    <button type='button' id='btnLogin' onClick={aoEnviarLogin}>Entrar</button>
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
