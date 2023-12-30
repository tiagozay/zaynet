import React, { useContext, useEffect, useState } from 'react';
import './LoginOuCadastro.css';
import { CadastroUsuarioContext } from '../../contexts/CadastroUsuarioContext';
import CadastrarUsuario from '../../components/CadastrarUsuario';

export default function LoginOuCadastro() {
    const {
        indicadorCadastroUsuarioAberto,
        setIndicadorCadastroUsuarioAberto,
    } = useContext(CadastroUsuarioContext);

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
                    <input type="email" placeholder='E-mail' />
                    <div id='divInputSenha' className='divInputSenhaLogin'>
                        <input type={exibirSenha ? "text" : "password"} placeholder='Senha' />
                        <button type='button' className='material-symbols-outlined' onClick={handleExibirSenha}>
                            {exibirSenha ? 'visibility_off' : 'visibility'}
                        </button>
                    </div>
                    <button type='button' id='btnLogin'>Entrar</button>
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
