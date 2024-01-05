import React, { useEffect, useState } from 'react';
import './PublicacaoCompartilhada.css';
import InteracoesComAPublicacao from '../Publicacao/InteracoesComAPublicacao';
import Comentarios from '../Publicacao/Comentarios';
import Publicacao from '../Publicacao';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import { useNavigate } from 'react-router-dom';
import ModalEditarPublicacao from '../ModalEditarPublicacao';
import ModalEditarPublicacaoCompartilhada from '../ModalEditarPublicacaoCompartilhada';
import ModalCompartilharPublicacao from '../ModalCompartilharPublicacao';

export default function PublicacaoCompartilhada() {

    //Mock provisório que indica se a publicacao atual é do autor que está logado. Futuramente para obter esse dado deverá ser feita uma verificação com dados vindos do redux ou algo semelhante
    const indicadorPublicacaoDoUsuarioLogado = true;

    const publicacao = {
        nomeAutor: "Pedro souza",
        perfil: "./imagensDinamicas/perfil.jpg",
        tempoDePublicacao: "5 minutos",
        texto: "Isto é uma verdadeira obra de arte!",
    }

    const [indicadorModalEditarPublicacaoAberto, setIndicadorModalEditarPublicacaoAberto] = useState(false);
    const [indicadorModalCompartilharPublicacaoAberto, setIndicadorModalCompartilharPublicacaoAberto] = useState(false);

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    useEffect(() => {
        if (indicadorModalEditarPublicacaoAberto) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [indicadorModalEditarPublicacaoAberto]);

    function abrirModalCompartilharPublicacao() {
        if (isMobile) {
            navigate('/editarPublicacao');
        } else {
            setIndicadorModalCompartilharPublicacaoAberto(true);
        }
    }

    function fehcarModalCompartilharPublicacao() {
        setIndicadorModalCompartilharPublicacaoAberto(false);
    }

    function abrirModalEditarPublicacao() {
        if (isMobile) {
            navigate('/editarPublicacaoCompartilhada');
        } else {
            setIndicadorModalEditarPublicacaoAberto(true);
        }
    }

    function fehcarModalEditarPublicacao() {
        setIndicadorModalEditarPublicacaoAberto(false);
    }

    return (
        <>
            {
                indicadorModalEditarPublicacaoAberto ?
                    <ModalEditarPublicacaoCompartilhada
                        fecharModal={fehcarModalEditarPublicacao}
                        modalAberto={indicadorModalEditarPublicacaoAberto}
                    /> :
                    ""
            }
            {
                indicadorModalCompartilharPublicacaoAberto ?
                    <ModalCompartilharPublicacao
                        fecharModal={fehcarModalCompartilharPublicacao}
                        modalAberto={indicadorModalCompartilharPublicacaoAberto}
                    /> :
                    ""
            }
            <div id='publicacaoCompartilhada'>
                <div id='publicacaoCompartilhada__infoUsuario'>
                    <div id='publicacaoCompartilhada__infoUsuarioContainer'>
                        <img src={publicacao.perfil} alt="Perfil usuário" id='publicacaoCompartilhada__perfil' />
                        <div id='publicacaoCompartilhada__infoUsuarioContainer__divInfo'>
                            <p id='publicacaoCompartilhada__tituloAutor'>
                                <span>Pedro souza </span>
                                compartilhou uma publicação
                            </p>
                            <p id='publicacaoCompartilhada__tempoDePublicacao'>Há {publicacao.tempoDePublicacao}</p>
                        </div>
                    </div>
                    {
                        indicadorPublicacaoDoUsuarioLogado ?
                            <button
                                className='material-symbols-outlined'
                                id='publicacao__btnEditarPublicacao'
                                onClick={abrirModalEditarPublicacao}
                            >edit</button> :
                            ""
                    }
                </div>



                <p id='publicacaoCompartilhada__texto'>{publicacao.texto}</p>

                <div id='publicacaoCompartilhada__containerPublicacao'>
                    <Publicacao publicacaoCompartilhada={true} />
                </div>


                <InteracoesComAPublicacao compartilharPublicacao={abrirModalCompartilharPublicacao}/>

                <div id='publicacaoCompartilhada__linhaDivisoria'></div>
                <Comentarios />
            </div>
        </>

    )
}
