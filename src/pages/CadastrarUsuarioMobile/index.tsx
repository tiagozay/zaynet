import React, { useEffect, useState } from 'react';
import './CadastrarUsuarioMobile.css';
import { useNavigate } from 'react-router-dom';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';

export default function CadastrarUsuarioMobile() {
    const navigate = useNavigate();

    const [exibirSenha, setExibirSenha] = useState(false);

    useEffect(() => {
        verificaTamanhoDaTelaESaiDaRotaSeForMobile();

        const handleResize = () => verificaTamanhoDaTelaESaiDaRotaSeForMobile();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function verificaTamanhoDaTelaESaiDaRotaSeForMobile() {
        if (window.innerWidth > TAMANHO_DE_TELA_MOBILE) {
            navigate('/login');
        }
    }

    function handleExibirSenha() {
        setExibirSenha(state => !state);
    }

    function clickVoltar()
    {
        navigate(-1);
    }

    return (
        <section id="cadastrarUsuarioMobilePage">
            <div id='cadastrarUsuarioMobile__divTituloEBtnVoltar'>
                <button className='material-symbols-outlined' id='cadastrarUsuarioMobile__btnVoltar' onClick={clickVoltar}>
                    arrow_back_ios
                </button>
                <h3 id='cadastrarUsuarioMobile__titulo'>
                    Criar conta
                </h3>
            </div>
            <form id='cadastrarUsuarioMobile__formulario'>
                <div className='cadastrarUsuarioMobile__formulario__divLinhasDeInputs'>
                    <input type="text" id='cadastrarUsuarioMobile__inputNome' placeholder='Nome' />
                    <input type="text" placeholder='Sobrenome' />
                </div>
                <input type="email" placeholder='E-mail' />

                <div id='cadastrarUsuarioMobile__divInputSenha'>
                    <input type={exibirSenha ? "text" : "password"} placeholder='Senha' />
                    <button type='button' className='material-symbols-outlined' onClick={handleExibirSenha}>
                        {exibirSenha ? 'visibility_off' : 'visibility'}
                    </button>
                </div>

                <label>
                    Data de nascimento
                    <input type="date" placeholder='Data de nascimento' />
                </label>

                <label id='cadastrarUsuarioMobile__labelOpcoesGenero'>
                    Gênero
                    <div>
                        <label className='cadastrarUsuarioMobile__labelOpcaoGenero'>
                            Feminino
                            <input type="radio" name="genero" />
                        </label>
                        <label className='cadastrarUsuarioMobile__labelOpcaoGenero'>
                            Masculino
                            <input type="radio" name="genero" />
                        </label>
                    </div>

                </label>

                <button type='button' id='cadastrarUsuarioMobile__btnCadastrar'>Cadastre-se</button>
            </form>
        </section>
    )
}
