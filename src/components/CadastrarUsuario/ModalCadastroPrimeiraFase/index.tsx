import React, { useContext, useState } from 'react';
import './ModalCadastroPrimeiraFase.css';
import { CadastroUsuarioContext } from '../../../contexts/CadastroUsuarioContext';

interface ModalCadastroPrimeiraFaseProps
{
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

    const [exibirSenha, setExibirSenha] = useState(false);

    function handleExibirSenha() {
        setExibirSenha(state => !state);
    }

    function handleChangeNome(e: React.ChangeEvent<HTMLInputElement>)
    {
        setNome(e.target.value);
    }

    function handleChangeSobrenome(e: React.ChangeEvent<HTMLInputElement>)
    {
        setSobrenome(e.target.value);
    }

    function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>)
    {
        setEmail(e.target.value);
    }

    function handleChangeSenha(e: React.ChangeEvent<HTMLInputElement>)
    {
        setSenha(e.target.value);
    }

    function handleChangeDataDeNascimento(e: React.ChangeEvent<HTMLInputElement>)
    {
        setDataDeNascimento(e.target.value);
    }

    function handleChangeGenero(e: React.ChangeEvent<HTMLInputElement>)
    {
        setGenero(e.target.value as "Feminino" | "Masculino");
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
                    <input type="text" placeholder='Sobrenome' value={sobrenome} onChange={handleChangeSobrenome}/>
                </div>

                <input type="email" placeholder='E-mail' value={email} onChange={handleChangeEmail}/>

                <div id='primeiraFaseCadastro__divInputSenha'>
                    <input type={exibirSenha ? "text" : "password"} placeholder='Senha' value={senha} onChange={handleChangeSenha}/>
                    <button type='button' className='material-symbols-outlined' onClick={handleExibirSenha}>
                        {exibirSenha ? 'visibility_off' : 'visibility'}
                    </button>
                </div>

                <label>
                    Data de nascimento
                    <input type="date" placeholder='Data de nascimento' value={dataDeNascimento} onChange={handleChangeDataDeNascimento}/>
                </label>

                <label id='primeiraFaseCadastro__labelOpcoesGenero'>
                    Gênero
                    <div>
                        <label className='primeiraFaseCadastro__labelOpcaoGenero'>
                            Feminino
                            <input type="radio" name="genero" value="Feminino" checked={genero === "Feminino"} onChange={handleChangeGenero}/>
                        </label>
                        <label className='primeiraFaseCadastro__labelOpcaoGenero'>
                            Masculino
                            <input type="radio" name="genero" value="Masculino" checked={genero === "Masculino"} onChange={handleChangeGenero}/>
                        </label>
                    </div>

                </label>

                <button
                    type='button'
                    id='primeiraFaseCadastro__btnCadastrar'
                    onClick={clickCadastrar}
                >Cadastre-se</button>
            </form>
        </div>
    )
}
