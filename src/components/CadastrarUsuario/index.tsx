import React, { useContext, useEffect, useRef, useState } from 'react';
import './CadastrarUsuario.css';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import ModalCadastroPrimeiraFase from './ModalCadastroPrimeiraFase';
import ModalCadastroSegundaFase from './ModalCadastroSegundaFase';
import { useNavigate } from 'react-router-dom';
import { CadastroUsuarioContext } from '../../contexts/CadastroUsuarioContext';
import { APIService } from '../../services/APIService';

interface CadastrarUsuarioProps {
    fecharCadastro: () => void,
    modalAberto: boolean,
}

export default function CadastrarUsuario({ fecharCadastro, modalAberto }: CadastrarUsuarioProps) {

    const navigate = useNavigate();

    const overlay = useRef(null);

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    const [modalPrimeiraFaseCadastroAberto, setModalPrimeiraFaseCadastroAberto] = useState(false);
    const [modalSegundaFaseCadastroAberto, setModalSegundaFaseCadastroAberto] = useState(false);

    const { 
        setIndicadorCadastroUsuarioAberto,
        fasesDoCadastroConcluidas, 
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
        setGenero,
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

    useEffect(() => {

        //Verfiicação que indica que todas as fases do cadastro já foram concluídas
        if(fasesDoCadastroConcluidas === 2){
            zerarIndicadoresDeCadastro();

            const formData = new FormData();

            // if(fotoDoPerfil){
            //     formData.append('fotoDoPerfil', fotoDoPerfil);
            // }

            // if(fotoDaCapa){
            //     formData.append('fotoDaCapa', fotoDaCapa);
            // }

            APIService.post(
                'usuarios', 
                {
                    nome,
                    sobrenome,
                    email,
                    senha,
                    dataDeNascimento,
                    genero,
                    cidadeNatal,
                    cidadeAtual,
                    statusDeRelacionamento,
                } 
            )
            .then(res => console.log(res))
            .catch(res => console.log(res))


        }

        if (!isMobile && fasesDoCadastroConcluidas === 0) {
            setModalPrimeiraFaseCadastroAberto(true);
        } else if (!isMobile && fasesDoCadastroConcluidas === 1) {
            setModalPrimeiraFaseCadastroAberto(false);
            setModalSegundaFaseCadastroAberto(true);
        } else if (isMobile && fasesDoCadastroConcluidas === 0) {
            navigate('/cadastrarUsuarioMobilePrimeiraFase');
        } else if (isMobile && fasesDoCadastroConcluidas === 1) {
            navigate('/cadastrarUsuarioMobileSegundaFase');
        }
    }, [isMobile, fasesDoCadastroConcluidas]);

    useEffect(() => {

        let handleEscKey = (event: KeyboardEvent) => {
            event.key === 'Escape' && handleFecharCadastro();
        }

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    function clickOverlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === overlay.current) {
            handleFecharCadastro();
        }
    }

    function zerarIndicadoresDeCadastro()
    {
        setIndicadorCadastroUsuarioAberto(false);
        setFasesDoCadastroConcluidas(0);
        setModalPrimeiraFaseCadastroAberto(false);
        setModalSegundaFaseCadastroAberto(false);

        setNome("");
        setSobrenome("");
        setEmail("");
        setSenha("");
        setDataDeNascimento("");
        setGenero("");
        setCidadeNatal("");
        setCidadeAtual("");
        setStatusDeRelacionamento("");
        setFotoDoPerfil(null);
        setFotoDaCapa(null);
    }

    function clickCadastrarPrimeiraFasePeloModal() {
        setFasesDoCadastroConcluidas(1);
    }

    function clickCadastrarSegundaFasePeloModal() {
        setFasesDoCadastroConcluidas(2);
    }

    function handleFecharCadastro()
    {
        zerarIndicadoresDeCadastro();
        fecharCadastro();
    }

    let modalDeCadastroAbertoNoMomento;
    if (modalPrimeiraFaseCadastroAberto) {
        modalDeCadastroAbertoNoMomento = (
            <ModalCadastroPrimeiraFase
                fecharCadastro={handleFecharCadastro}
                clickCadastrar={clickCadastrarPrimeiraFasePeloModal}
            />
        );
    } else if (modalSegundaFaseCadastroAberto) {
        modalDeCadastroAbertoNoMomento = (
            <ModalCadastroSegundaFase
                fecharCadastro={handleFecharCadastro}
                clickCadastrar={clickCadastrarSegundaFasePeloModal}
            />
        );
    }

    return (
        <div id='modalCadastroUsuarioOverlay' ref={overlay} onClick={clickOverlay}>
            {modalDeCadastroAbertoNoMomento}
        </div>
    )
}
