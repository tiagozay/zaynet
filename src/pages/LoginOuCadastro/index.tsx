import React, { useState } from 'react';
import './LoginOuCadastro.css';

export default function LoginOuCadastro() {

    const [exibirSenha, setExibirSenha] = useState(false);

    function handleExibirSenha()
    {
        setExibirSenha( state => !state );
    }

    return (
        <section>
            <form id='formularioDeLogin'>
                <input type="email" placeholder='E-mail' />
                <div id='divInputSenha'>
                    <input type={exibirSenha ? "text" : "password"} placeholder='Senha' />
                    <button type='button' className='material-symbols-outlined' onClick={handleExibirSenha}>
                        {exibirSenha ? 'visibility_off' : 'visibility'}
                    </button>
                </div>
                <button type='button' id='btnLogin'>Entrar</button>
                <button type='button' id='btnEsqueceuASenha'>Esqueceu a senha?</button>
                <hr id='linhaDivisoria' />
                <button type='button' id='btnCriarNovaConta'>Criar nova conta</button>
            </form>
        </section>
    )
}
