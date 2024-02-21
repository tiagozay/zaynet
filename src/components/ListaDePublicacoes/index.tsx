import React, { useContext, useEffect, useState } from 'react';
import './ListaDePublicacoes.css';
import { PublicacaoModel } from '../../models/Publicacao/PublicacaoModel';
import { PublicacaoCompartilhadaModel } from '../../models/Publicacao/PublicacaoCompartilhadaModel';
import PublicacaoCompartilhada from '../PublicacaoCompartilhada';
import Publicacao from '../Publicacao';
import { CompartilharPublicacaoContext } from '../../contexts/CompartilharPublicacaoContext';
import { EditarPublicacaoContext } from '../../contexts/EditarPublicacaoContext';
import { FeedContext } from '../../contexts/FeedContext';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import { PublicarContext } from '../../contexts/PublicarContext';
import { useNavigate } from 'react-router-dom';
import ModalPublicar from '../ModalPublicar';
import ModalCompartilharPublicacao from '../ModalCompartilharPublicacao';
import ModalEditarPublicacao from '../ModalEditarPublicacao';
import Toast from '../Toast';
import { PublicacaoFactory } from '../../services/PublicacaoFactory';
import UsuarioService from '../../services/UsuarioService';

interface ListaDePublicacoesProps {
    publicacoesParaListar: Array<PublicacaoModel | PublicacaoCompartilhadaModel>
}

export default function ListaDePublicacoes({ publicacoesParaListar }: ListaDePublicacoesProps) {

    const [publicacoes, setPublicacoes] = useState<Array<PublicacaoModel | PublicacaoCompartilhadaModel>>(
        publicacoesParaListar
    );

    const [mensagemToast, setMensagemToast] = useState<string | null>(null);

    const { indicadorModalPublicarAberto, setIndicadorModalPublicarAberto } = useContext(PublicarContext);

    const {
        indicadorModalCompartilharPublicacaoAberto,
        setIndicadorModalCompartilharPublicacaoAberto,
        publicacaoCompartilhada,
        setPublicacaoCompartilhada
    } = useContext(CompartilharPublicacaoContext);

    const {
        indicadorModalEditarPublicacaoAberto,
        setIndicadorModalEditarPublicacaoAberto,
        publicacaoEditada,
        setPublicacaoEditada
    } = useContext(EditarPublicacaoContext);

    const { posicaoFeed, definePosicaoDoFeed } = useContext(FeedContext);

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    useEffect(() => {
        setPublicacoes(publicacoesParaListar);
    }, [publicacoesParaListar])

    useEffect(() => {
        if (indicadorModalPublicarAberto || indicadorModalCompartilharPublicacaoAberto || indicadorModalEditarPublicacaoAberto) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [indicadorModalPublicarAberto, indicadorModalCompartilharPublicacaoAberto, indicadorModalEditarPublicacaoAberto]);


    function abrirModalPublicar() {
        if (isMobile) {
            navigate('/publicar');
        } else {
            setIndicadorModalPublicarAberto(true);
        }
    }

    function abrirCompartilhamento(publicacao: PublicacaoModel) {

        setPublicacaoCompartilhada(publicacao);

        if (isMobile) {
            definePosicaoDoFeed(window.scrollY)
                .then(() => {
                    navigate('/compartilharPublicacao');
                })
        } else {
            setIndicadorModalCompartilharPublicacaoAberto(true);
        }
    }

    function abrirEdicaoPublicacao(publicacao: PublicacaoModel | PublicacaoCompartilhadaModel) {
        setPublicacaoEditada(publicacao);
        if (isMobile) {
            definePosicaoDoFeed(window.scrollY)
                .then(() => {
                    navigate('/editarPublicacao');
                })
        } else {
            definePosicaoDoFeed(window.scrollY)
                .then(() => {
                    setIndicadorModalEditarPublicacaoAberto(true);
                })
        }
    }

    function fecharModalPublicar() {
        setIndicadorModalPublicarAberto(false);
    }

    function fecharCompartilhamento() {
        setIndicadorModalCompartilharPublicacaoAberto(false);
        setPublicacaoCompartilhada(null);
    }

    function fehcarModalEditarPublicacao() {
        setIndicadorModalEditarPublicacaoAberto(false);
        setPublicacaoEditada(null);
    }

    function aoPublicar(publicacao: object) {
        abrirToast("Publicação criada com sucesso!");
        adicionaNovaPublicacaoAoEstado(publicacao);
    }

    function aoCompartilhar() {
        abrirToast("Publicação compartilhada com sucesso!");
        setPublicacaoCompartilhada(null);
    }

    function aoEditar(publicacaoEditada: any) {
        abrirToast("Publicação editada com sucesso!");

        setPublicacoes(state => state.map(publicacao => {

            if (publicacao.id === publicacaoEditada.id) {
                return PublicacaoFactory.create(publicacaoEditada);
            }

            return publicacao;

        }))

    }

    function adicionaNovaPublicacaoAoEstado(publicacaoCadastrada: object) {
        const publicacao = PublicacaoFactory.create(publicacaoCadastrada);

        setPublicacoes(state => [publicacao, ...state])
    }

    function abrirToast(mensagem: string) {
        setMensagemToast(mensagem);
    }

    function fecharToast() {
        setMensagemToast(null);
    }

    return (
        <>

            {
                mensagemToast &&
                <Toast
                    texto={mensagemToast}
                    fechaToast={fecharToast}
                />
            }

            {
                indicadorModalPublicarAberto ?
                    <ModalPublicar
                        modalAberto={indicadorModalPublicarAberto}
                        fecharModal={fecharModalPublicar}
                        aoPublicar={aoPublicar}
                    /> :
                    ""
            }

            {
                indicadorModalCompartilharPublicacaoAberto ?
                    <ModalCompartilharPublicacao
                        publicacao={publicacaoCompartilhada as PublicacaoModel}
                        fecharModal={fecharCompartilhamento}
                        aoCompartilhar={aoCompartilhar}
                    /> :
                    ""
            }

            {
                indicadorModalEditarPublicacaoAberto ?
                    <ModalEditarPublicacao
                        publicacao={publicacaoEditada as PublicacaoModel | PublicacaoCompartilhadaModel}
                        fecharModal={fehcarModalEditarPublicacao}
                        aoEditar={aoEditar}
                        modalAberto={indicadorModalEditarPublicacaoAberto}
                    /> :
                    ""
            }

            <div id='listaDePublicacoes_adicionarUmaNovaPublicacao'>
                <div id='listaDePublicacoes_adicionarUmaNovaPublicacao__container'>
                    <img
                        src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
                        alt="Foto perfil"
                        id='listaDePublicacoes_adicionarUmaNovaPublicacao__perfil'
                    />
                    <input
                        type="text"
                        id='listaDePublicacoes_adicionarUmaNovaPublicacao__input'
                        placeholder='No que você está pensando, Pedro?'
                        onClick={abrirModalPublicar}
                        disabled={indicadorModalPublicarAberto ? true : false}
                    />
                </div>
                <button id='listaDePublicacoes_adicionarUmaNovaPublicacao__btnFotoEVideo' onClick={abrirModalPublicar}>
                    <img src="./icones/imagemIcone.png" alt="" />
                    Foto/vídeo
                </button>
            </div>

            {
                publicacoes.map(publicacao => {
                    if (publicacao instanceof PublicacaoCompartilhadaModel) {
                        return <PublicacaoCompartilhada
                            key={publicacao.id}
                            publicacao={publicacao}
                            compartilharPublicacao={abrirCompartilhamento}
                            editarPublicacao={abrirEdicaoPublicacao}
                        />
                    } else {
                        return <Publicacao
                            key={publicacao.id}
                            publicacao={publicacao}
                            compartilharPublicacao={abrirCompartilhamento}
                            editarPublicacao={abrirEdicaoPublicacao}
                        />
                    }
                })
            }
        </>
    )
}
