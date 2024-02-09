import React, { memo, useContext, useEffect, useState } from 'react';
import './PublicacaoCompartilhada.css';
import InteracoesComAPublicacao from '../Publicacao/InteracoesComAPublicacao';
import Comentarios from '../Publicacao/Comentarios';
import Publicacao from '../Publicacao';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import { useNavigate } from 'react-router-dom';
import ModalEditarPublicacaoCompartilhada from '../ModalEditarPublicacaoCompartilhada';
import ModalCompartilharPublicacao from '../ModalCompartilharPublicacao';
import MenuOpcoesPublicacao from '../MenuOpcoesPublicacao';
import { PublicacaoCompartilhadaModel } from '../../models/Publicacao/PublicacaoCompartilhadaModel';
import { APIService } from '../../services/APIService';
import { PublicacaoService } from '../../services/PublicacaoService';
import { CompartilharPublicacaoContext } from '../../contexts/CompartilharPublicacaoContext';
import { FeedContext } from '../../contexts/FeedContext';

interface PublicacaoCompartilhadaProps {
    publicacao: PublicacaoCompartilhadaModel
}

function PublicacaoCompartilhada({ publicacao }: PublicacaoCompartilhadaProps) {

    //Mock provisório que indica se a publicacao atual é do autor que está logado. Futuramente para obter esse dado deverá ser feita uma verificação com dados vindos do redux ou algo semelhante
    const indicadorPublicacaoDoUsuarioLogado = true;

    const [indicadorModalEditarPublicacaoAberto, setIndicadorModalEditarPublicacaoAberto] = useState(false);

    const { definePosicaoDoFeed } = useContext(FeedContext);

    const {
        indicadorModalCompartilharPublicacaoAberto,
        setIndicadorModalCompartilharPublicacaoAberto,
        idPublicacaoCompartilhada,
        setIdPublicacaoCompartilhada,
    } = useContext(CompartilharPublicacaoContext);

    const [quantidadeDeComentarios, setQuantidadeDeComentarios] = useState(
        publicacao.comentarios ? publicacao.comentarios.length : 0
    );
    const [quantidadeDeCurtidas, setQuantidadeDeCurtidas] = useState(
        publicacao.curtidas ? publicacao.curtidas.length : 0
    );

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    useEffect(() => {
        if (indicadorModalEditarPublicacaoAberto) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [indicadorModalEditarPublicacaoAberto]);

    function clickCompartilharPublicacao() {
        setIdPublicacaoCompartilhada(publicacao.id);

        if (isMobile) {
            setIndicadorModalCompartilharPublicacaoAberto(true);
            navigate('/compartilharPublicacao', { state: publicacao.publicacao });
            definePosicaoDoFeed(window.scrollY)
                .then(() => { navigate('/compartilharPublicacao', { state: publicacao }) })
        } else {
            setIndicadorModalCompartilharPublicacaoAberto(true);
        }
    }

    function fehcarModalCompartilharPublicacao() {
        setIdPublicacaoCompartilhada(null);
        setIndicadorModalCompartilharPublicacaoAberto(false);
    }

    function editarPublicacao() {
        if (isMobile) {
            navigate('/editarPublicacaoCompartilhada');
        } else {
            setIndicadorModalEditarPublicacaoAberto(true);
        }
    }

    function compartilharPublicacao(textoDigitado: string | null) {
        PublicacaoService.compartilhar(textoDigitado, publicacao.publicacao)
            .then(() => {
                fehcarModalCompartilharPublicacao();
            })
            .catch(() => { })
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
                indicadorModalCompartilharPublicacaoAberto && idPublicacaoCompartilhada === publicacao.id ?
                    <ModalCompartilharPublicacao
                        publicacao={publicacao.publicacao}
                        fecharModal={fehcarModalCompartilharPublicacao}
                        aoCompartilharPublicacao={compartilharPublicacao}
                        modalAberto={indicadorModalCompartilharPublicacaoAberto}
                    /> :
                    ""
            }
            <div id='publicacaoCompartilhada'>
                <div id='publicacaoCompartilhada__infoUsuario'>
                    <div id='publicacaoCompartilhada__infoUsuarioContainer'>
                        <img src={`${process.env.REACT_APP_CAMINHO_IMAGEM_PERFIL_MINIATURA}${publicacao.autor.nomeMiniaturaFotoPerfil}`} alt="Perfil usuário" id='publicacaoCompartilhada__perfil' />
                        <div id='publicacaoCompartilhada__infoUsuarioContainer__divInfo'>
                            <p id='publicacaoCompartilhada__tituloAutor'>
                                <span>{`${publicacao.autor.nome} ${publicacao.autor.sobrenome}`} </span>
                                compartilhou uma publicação
                            </p>
                            <p id='publicacaoCompartilhada__tempoDePublicacao'>{publicacao.dataDePublicacao}</p>
                        </div>
                    </div>
                    {
                        indicadorPublicacaoDoUsuarioLogado ?
                            <MenuOpcoesPublicacao
                                clickEditarPublicacao={editarPublicacao}
                                clickExluirPublicacao={() => { }}
                            />
                            :
                            ""
                    }
                </div>

                <p id='publicacaoCompartilhada__texto'>{publicacao.texto}</p>

                <div id='publicacaoCompartilhada__containerPublicacao'>
                    <Publicacao
                        publicacao={publicacao.publicacao}
                        publicacaoCompartilhada={true}
                    />
                </div>


                <InteracoesComAPublicacao
                    publicacao={publicacao}
                    quantidadeDeComentarios={quantidadeDeComentarios}
                    quantidadeDeCurtidas={quantidadeDeCurtidas}
                    setQuantidadeDeCurtidas={setQuantidadeDeCurtidas}
                    compartilharPublicacao={clickCompartilharPublicacao}
                    quantidadeDeCompartilhamentos={0}
                />

                <div id='publicacaoCompartilhada__linhaDivisoria'></div>
                <Comentarios
                    idPublicacao={publicacao.id}
                    setQuantidadeDeComentarios={setQuantidadeDeComentarios}
                    comentariosPublicacao={publicacao.comentarios}
                />
            </div>
        </>

    )
}

export default memo(PublicacaoCompartilhada);