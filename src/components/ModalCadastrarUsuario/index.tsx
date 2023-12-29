import React, { useEffect, useRef, useState } from 'react';
import './ModalCadastrarUsuario.css';

interface ModalCadastrarUsuarioProps 
{
    fecharModal: () => void,
}

export default function ModalCadastrarUsuario({fecharModal} : ModalCadastrarUsuarioProps) {

    const [exibirSenha, setExibirSenha] = useState(false);

    const overlay = useRef(null);

    useEffect(() => {

        let handleEscKey = (event: KeyboardEvent) => {
            event.key === 'Escape' && fecharModal();
        }

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === overlay.current) {
            fecharModal();
        }
    }

    function handleExibirSenha() {
        setExibirSenha(state => !state);
    }

    return (
        <div id='modalCriarContaOverlay' ref={overlay} onClick={clickOverlay}>
            <div id='modalCriarConta'>
                <div id='modalCriarConta__divTituloEBtnFechar'>
                    <h3>Cadastre-se</h3>
                    <button className='material-symbols-outlined' id='modalCriarConta__btnFechar' onClick={fecharModal}>
                        close
                    </button>
                </div>
                <hr id='linhaDivisoriaTitulo' />
                <form id='modalCriarConta__formulario'>
                    <div id='divInputNomeESobrenome' className='modalCriarConta__formulario__divLinhasDeInputs'>
                        <input type="text" id='modalCriarConta__inputNome' placeholder='Nome' />
                        <input type="text" placeholder='Sobrenome' />
                    </div>
                    <input type="email" placeholder='E-mail' />

                    <div id='divInputSenha'>
                        <input type={exibirSenha ? "text" : "password"} placeholder='Senha' />
                        <button type='button' className='material-symbols-outlined' onClick={handleExibirSenha}>
                            {exibirSenha ? 'visibility_off' : 'visibility'}
                        </button>
                    </div>

                    <label>
                        Data de nascimento
                        <input type="date" placeholder='Data de nascimento' />
                    </label>

                    <label id='modalCriarConta__labelOpcoesGenero'>
                        Gênero
                        <div>
                            <label className='modalCriarConta__labelOpcaoGenero'>
                                Feminino
                                <input type="radio" name="genero" />
                            </label>
                            <label className='modalCriarConta__labelOpcaoGenero'>
                                Masculino
                                <input type="radio" name="genero" />
                            </label>
                        </div>

                    </label>

                    <button type='button' id='btnCadastrar'>Cadastre-se</button>
                </form>
            </div>
        </div>
    )
}
