import React, { useContext, useEffect, useState } from 'react';
import './ModalCadastroSegundaFase.css';
import { CadastroUsuarioContext } from '../../../contexts/CadastroUsuarioContext';

interface ModalCadastroPrimeiraFaseProps {
    fecharCadastro: () => void,
    clickCadastrar: () => void,
}

export default function ModalCadastroSegundaFase({
    fecharCadastro,
    clickCadastrar
}: ModalCadastroPrimeiraFaseProps) {

    const {
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

    useEffect(() => {
        if(
            cidadeNatal.length > 0 &&
            cidadeAtual.length > 0 &&
            statusDeRelacionamento.length > 0
        ){  
            setIndicadorPermicaoEnviarFormulario(true);
        }else{
            setIndicadorPermicaoEnviarFormulario(false);
        }
    }, [cidadeNatal, cidadeAtual, statusDeRelacionamento, fotoDoPerfil, fotoDaCapa]);

    function handleChangeCidadeNatal(e: React.ChangeEvent<HTMLInputElement>) {
        setCidadeNatal(e.target.value.trim());
    }

    function handleChangeCidadeAtual(e: React.ChangeEvent<HTMLInputElement>) {
        setCidadeAtual(e.target.value.trim());
    }

    function handleStatusDeRelacionamento(e: React.ChangeEvent<HTMLSelectElement>) {
        setStatusDeRelacionamento(e.target.value.trim());
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
        <div id='modalCadastro'>
            <div id='modalCadastro__divTituloEBtnFechar'>
                <h3>Informações sobre</h3>
                <button className='material-symbols-outlined' id='modalCadastro__btnFechar' onClick={fecharCadastro}>
                    close
                </button>
            </div>
            <hr id='linhaDivisoriaTitulo' />
            <form id='modalCadastro__formulario'>

                <input type="text" placeholder='Cidade natal' value={cidadeNatal} onChange={handleChangeCidadeNatal} />
                <input type="text" placeholder='Cidade atual' value={cidadeAtual} onChange={handleChangeCidadeAtual} />

                <label id='segundaFaseCadastro__labelStatusRelacionamento'>
                    Status de relacionamento
                    <select id="segundaFaseCadastro__selectStatusDeRelacionamento" value={statusDeRelacionamento} onChange={handleStatusDeRelacionamento}>
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
                    id='segundaFaseCadastro__btnCadastrar'
                    className={
                        !indicadorPermicaoEnviarFormulario ?
                            'segundaFaseCadastro__btnCadastrarDesativado' :
                            ''
                    }
                    onClick={clickCadastrar}
                    disabled={!indicadorPermicaoEnviarFormulario}
                >Finalizar cadastro</button>
            </form>
        </div>
    )
}
