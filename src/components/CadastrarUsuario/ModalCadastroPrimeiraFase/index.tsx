import React, { useContext, useEffect, useState } from 'react';
import './ModalCadastroPrimeiraFase.css';
import { CadastroUsuarioContext } from '../../../contexts/CadastroUsuarioContext';

interface ModalCadastroPrimeiraFaseProps {
    fecharCadastro: () => void,
    clickCadastrar: () => void,
}

export default function ModalCadastroPrimeiraFase({
    fecharCadastro,
    clickCadastrar
}: ModalCadastroPrimeiraFaseProps) {

    const {
        nome,
        setNome,
        sobrenome,
        setSobrenome,
        email,
        setEmail,
        senha,
        setSenha,
        dataDeNascimento,
        setDataDeNascimento,
        genero,
        setGenero
    } = useContext(CadastroUsuarioContext);

    const [indicadorAvisoSenhaAberto, setIndicadorAvisoSenhaAberto] = useState(false);
    const [indicadorPermicaoEnviarFormulario, setIndicadorPermicaoEnviarFormulario] = useState(false);

    const [exibirSenha, setExibirSenha] = useState(false);

    useEffect(() => {
        if (
            nome.length > 0 &&
            sobrenome.length > 0 &&
            email.length > 0 &&
            senha.length > 0 &&
            senha.length >= 8 &&
            dataDeNascimento.length > 0 &&
            genero.length > 0
        ) {
            setIndicadorPermicaoEnviarFormulario(true);
        } else {
            setIndicadorPermicaoEnviarFormulario(false);
        }
    }, [nome, sobrenome, email, senha, dataDeNascimento, genero]);

    useEffect(() => {
        if (senha.length > 0 && senha.length < 8) {
            setIndicadorAvisoSenhaAberto(true);
        } else {
            setIndicadorAvisoSenhaAberto(false);
        }
    }, [senha])

    function handleExibirSenha() {
        setExibirSenha(state => !state);
    }

    function handleChangeNome(e: React.ChangeEvent<HTMLInputElement>) {
        setNome(e.target.value.trim());
    }

    function handleChangeSobrenome(e: React.ChangeEvent<HTMLInputElement>) {
        setSobrenome(e.target.value.trim());
    }

    function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value.trim());
    }

    function handleChangeSenha(e: React.ChangeEvent<HTMLInputElement>) {
        setSenha(e.target.value.trim());
    }

    function handleChangeDataDeNascimento(e: React.ChangeEvent<HTMLInputElement>) {
        setDataDeNascimento(e.target.value.trim());
    }

    function handleChangeGenero(e: React.ChangeEvent<HTMLInputElement>) {
        setGenero(e.target.value.trim() as "Feminino" | "Masculino");
    }

    return (
        <div id='modalCadastro'>
            <div id='modalCadastro__divTituloEBtnFechar'>
                <h3>Cadastre-se</h3>
                <button className='material-symbols-outlined' id='modalCadastro__btnFechar' onClick={fecharCadastro}>
                    close
                </button>
            </div>
            <hr id='linhaDivisoriaTitulo' />
            <form id='modalCadastro__formulario'>
                <div className='primeiraFaseCadastro__divLinhasDeInputs'>
                    <input type="text" id='primeiraFaseCadastro__inputNome' placeholder='Nome' value={nome} onChange={handleChangeNome} />
                    <input type="text" placeholder='Sobrenome' value={sobrenome} onChange={handleChangeSobrenome} />
                </div>

                <input type="email" placeholder='E-mail' value={email} onChange={handleChangeEmail} />

                <div id='primeiraFaseCadastro__divInputSenhaContainer'>
                    <div id='primeiraFaseCadastro__divInputSenha'>
                        <input
                            type={exibirSenha ? "text" : "password"}
                            placeholder='Senha (no mínimo 8 caracteres)'
                            value={senha}
                            onChange={handleChangeSenha}
                        />
                        <button type='button' className='material-symbols-outlined' onClick={handleExibirSenha}>
                            {exibirSenha ? 'visibility_off' : 'visibility'}
                        </button>
                    </div>
                    {
                        indicadorAvisoSenhaAberto ?
                            <p id='primeiraFaseCadastro__mensagemAvisoInputSenha'>
                                Sua senha deve ter no mínimo 8 caracteres
                            </p> :
                            ""
                    }

                </div>

                <label>
                    Data de nascimento
                    <input type="date" placeholder='Data de nascimento' value={dataDeNascimento} onChange={handleChangeDataDeNascimento} />
                </label>

                <label id='primeiraFaseCadastro__labelOpcoesGenero'>
                    Gênero
                    <div>
                        <label className='primeiraFaseCadastro__labelOpcaoGenero'>
                            Feminino
                            <input type="radio" name="genero" value="Feminino" checked={genero === "Feminino"} onChange={handleChangeGenero} />
                        </label>
                        <label className='primeiraFaseCadastro__labelOpcaoGenero'>
                            Masculino
                            <input type="radio" name="genero" value="Masculino" checked={genero === "Masculino"} onChange={handleChangeGenero} />
                        </label>
                    </div>

                </label>

                <button
                    type='button'
                    id='primeiraFaseCadastro__btnCadastrar'
                    className={
                        !indicadorPermicaoEnviarFormulario ?
                            'primeiraFaseCadastro__btnCadastrarDesativado' :
                            ''
                    }
                    onClick={clickCadastrar}
                    disabled={!indicadorPermicaoEnviarFormulario}
                >Cadastre-se</button>
            </form>
        </div>
    )
}
