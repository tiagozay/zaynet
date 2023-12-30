import React, { useContext, useEffect, useState } from 'react';
import './CadastrarUsuarioMobile.css';
import { useNavigate } from 'react-router-dom';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import { CadastroUsuarioContext } from '../../contexts/CadastroUsuarioContext';
import { useMediaQuery } from 'react-responsive';

export default function CadastrarUsuarioMobilePrimeiraFase() {
    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    const {
        setIndicadorCadastroUsuarioAberto,
        setFasesDoCadastroConcluidas,
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

    useEffect(() => {
        if(!isMobile){
            navigate('/login');
        }
    }, [isMobile]);

    function handleExibirSenha() {
        setExibirSenha(state => !state);
    }

    function clickVoltar()
    {
        setIndicadorCadastroUsuarioAberto(false);
        navigate('/login');
    }

    function clickCadastrar()
    {
        setFasesDoCadastroConcluidas(1);
        navigate('/login');
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
                    <input type="text" id='cadastrarUsuarioMobile__inputNome' placeholder='Nome' value={nome} onChange={handleChangeNome}/>
                    <input type="text" placeholder='Sobrenome' value={sobrenome} onChange={handleChangeSobrenome}/>
                </div>
                <input type="email" placeholder='E-mail' value={email} onChange={handleChangeEmail}/>

                <div id='cadastrarUsuarioMobile__divInputSenha'>
                    <input type={exibirSenha ? "text" : "password"} placeholder='Senha' value={senha} onChange={handleChangeSenha}/>
                    <button type='button' className='material-symbols-outlined' onClick={handleExibirSenha}>
                        {exibirSenha ? 'visibility_off' : 'visibility'}
                    </button>
                </div>

                <label>
                    Data de nascimento
                    <input type="date" placeholder='Data de nascimento' value={dataDeNascimento} onChange={handleChangeDataDeNascimento}/>
                </label>

                <label id='cadastrarUsuarioMobile__labelOpcoesGenero'>
                    Gênero
                    <div>
                        <label className='cadastrarUsuarioMobile__labelOpcaoGenero'>
                            Feminino
                            <input type="radio" name="genero" value="Feminino" onChange={handleChangeGenero} checked={genero === "Feminino"}/>
                        </label>
                        <label className='cadastrarUsuarioMobile__labelOpcaoGenero'>
                            Masculino
                            <input type="radio" name="genero" value="Masculino" onChange={handleChangeGenero} checked={genero === "Masculino"}/>
                        </label>
                    </div>

                </label>

                <button 
                    type='button' 
                    id='cadastrarUsuarioMobile__btnCadastrar' 
                    onClick={clickCadastrar}
                >Cadastre-se</button>
            </form>
        </section>
    )
}
