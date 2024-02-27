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
import { useLocation, useNavigate } from 'react-router-dom';
import ModalPublicar from '../ModalPublicar';
import ModalCompartilharPublicacao from '../ModalCompartilharPublicacao';
import ModalEditarPublicacao from '../ModalEditarPublicacao';
import Toast from '../Toast';
import { PublicacaoFactory } from '../../services/PublicacaoFactory';
import UsuarioService from '../../services/UsuarioService';
import ModalDeConfirmacao from '../ModalDeConfirmacao';
import { APIService } from '../../services/APIService';

interface ListaDePublicacoesProps {
    publicacoesParaListar: Array<PublicacaoModel | PublicacaoCompartilhadaModel>,
    aoMudarListaDePublicacoes?: (publicacoes: Array<PublicacaoModel | PublicacaoCompartilhadaModel>) => void
}

export default function ListaDePublicacoes({ publicacoesParaListar, aoMudarListaDePublicacoes }: ListaDePublicacoesProps) {

    const location = useLocation();

    const [indicadorSeEhFeedPerfilUsuario, setIndicadorSeEhFeedPerfilUsuario] = useState(false);

    const [indicadorFeedPerfilDoUsuarioLogado, setIndicadorFeedPerfilDoUsuarioLogado] = useState(false);

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

    const [
        indicadorModalDeConfirmacaoDeExclusaoAberto,
        setIndicadorModalDeConfirmacaoDeExclusaoAberto
    ] = useState(false);

    const [idPublicacaoASerExcluida, setIdPublicacaoASerExcluida] = useState<number | null>(null);

    const { posicaoFeed, definePosicaoDoFeed } = useContext(FeedContext);

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    useEffect(() => {
        const match = location.pathname.match(/\/perfil\/(\d+)/);

        if (match) {
            setIndicadorSeEhFeedPerfilUsuario(true);
        } else {
            setIndicadorSeEhFeedPerfilUsuario(false);
        }

        if (match && Number(match[1]) === UsuarioService.obtemIdUsuarioLogado()) {
            setIndicadorFeedPerfilDoUsuarioLogado(true);
        } else {
            setIndicadorFeedPerfilDoUsuarioLogado(false);
        }

        //Dispara essa função quando muda algum state para componentes superiores que precisam saber receber as mudanças no estado da lista, como para obter todas as imagens do usuário no perfil
        if (aoMudarListaDePublicacoes) {
            aoMudarListaDePublicacoes(publicacoes);
        }

    }, [publicacoes]);

    useEffect(() => {
        setPublicacoes(publicacoesParaListar);
    }, [publicacoesParaListar])

    useEffect(() => {
        if (indicadorModalPublicarAberto || indicadorModalCompartilharPublicacaoAberto || indicadorModalEditarPublicacaoAberto || indicadorModalDeConfirmacaoDeExclusaoAberto) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [indicadorModalPublicarAberto, indicadorModalCompartilharPublicacaoAberto, indicadorModalEditarPublicacaoAberto, indicadorModalDeConfirmacaoDeExclusaoAberto]);


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

    function abrirExclusaoPublicacao(publicacao: PublicacaoModel | PublicacaoCompartilhadaModel) {
        setIndicadorModalDeConfirmacaoDeExclusaoAberto(true);
        setIdPublicacaoASerExcluida(publicacao.id);
    }

    function confirmarExclusaoDePublicacao() {
        APIService.delete(`publicacoes/${idPublicacaoASerExcluida}`)
            .then(() => {
                removePublicacaoDoEstado(idPublicacaoASerExcluida as number);
                fecharConfirmacaoDeExclusao();
            })
            .catch(() => { })
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

    function fecharConfirmacaoDeExclusao() {
        setIndicadorModalDeConfirmacaoDeExclusaoAberto(false);
        setIdPublicacaoASerExcluida(null);
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

    function removePublicacaoDoEstado(id: number) {

        //Obtem todos os compartilhamentos da publicação excluída para remover da lista
        const compartilhamentos = publicacoes.filter(publicacao =>
            (publicacao instanceof PublicacaoCompartilhadaModel) && (publicacao.publicacao.id === id)
        ) as PublicacaoCompartilhadaModel[];

        //Setter recebe um filter que remove a publicação em si e seus compartilhamentos. O filter deve retornar um false toda vez que a publicação da vez foi compartilhada ou tem o mesmo id (no caso de ser ela mesma). Quando chega um compartilhamento, o some retorna "true", que invertemos o valor e vira "false", aí como estamos utilizando o operador &&, retorna false para o filter e não adiciona essa publicação ao estado. Se não for um compartilhamento (primeira condição será "true", por conta da inversão), vai para a segunda e se o id for diferente, é sinal que pode adicionar essa publicação, pois não é a que estamos buscando, e se for igual (retorna false), por utilizar o operador &&, vai false para ele fazendo novamente com que não adicione essa publicação ao estado
        setPublicacoes(state => state.filter(publicacao => {
            return !(compartilhamentos.some(compartilhamento => compartilhamento === publicacao)) &&
                (publicacao.id !== id);
        }));
    }

    function abrirToast(mensagem: string) {
        setMensagemToast(mensagem);
    }

    function fecharToast() {
        setMensagemToast(null);
    }

    function clickPerfilDoUsuario() {

        const idUsuarioLogado = UsuarioService.obtemIdUsuarioLogado();

        //Antes de re-direcionar, verifica se já não está nesse perfil. Se sim, não faz nada.
        if (location.pathname !== `/perfil/${idUsuarioLogado}`) {
            navigate(`/perfil/${idUsuarioLogado}`);
        }
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

            {
                indicadorModalDeConfirmacaoDeExclusaoAberto ?
                    <ModalDeConfirmacao
                        aoConfirmar={confirmarExclusaoDePublicacao}
                        fecharModal={fecharConfirmacaoDeExclusao}
                        titulo='Excluir publicação'
                        mensagem='Deseja mesmo excluir esta publicação?'
                        modalAberto={indicadorModalDeConfirmacaoDeExclusaoAberto}
                    /> :
                    ""
            }

            {
                !indicadorSeEhFeedPerfilUsuario || indicadorFeedPerfilDoUsuarioLogado ?
                    <div id='listaDePublicacoes_adicionarUmaNovaPublicacao'>
                        <div id='listaDePublicacoes_adicionarUmaNovaPublicacao__container'>
                            <img
                                src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
                                alt="Foto perfil"
                                id='listaDePublicacoes_adicionarUmaNovaPublicacao__perfil'
                                onClick={clickPerfilDoUsuario}
                            />
                            <input
                                type="text"
                                id='listaDePublicacoes_adicionarUmaNovaPublicacao__input'
                                placeholder={`No que você está pensando, ${UsuarioService.obtemNomeDoUsuarioLogado()}?`}
                                onClick={abrirModalPublicar}
                                disabled={indicadorModalPublicarAberto ? true : false}
                            />
                        </div>
                        <button id='listaDePublicacoes_adicionarUmaNovaPublicacao__btnFotoEVideo' onClick={abrirModalPublicar}>
                            <img src="../icones/imagemIcone.png" alt="" />
                            Foto/vídeo
                        </button>
                    </div> : ""
            }



            {
                publicacoes.map(publicacao => {
                    if (publicacao instanceof PublicacaoCompartilhadaModel) {
                        return <PublicacaoCompartilhada
                            key={publicacao.id}
                            publicacao={publicacao}
                            compartilharPublicacao={abrirCompartilhamento}
                            editarPublicacao={abrirEdicaoPublicacao}
                            excluirPublicacao={abrirExclusaoPublicacao}
                        />
                    } else {
                        return <Publicacao
                            key={publicacao.id}
                            publicacao={publicacao}
                            compartilharPublicacao={abrirCompartilhamento}
                            editarPublicacao={abrirEdicaoPublicacao}
                            excluirPublicacao={abrirExclusaoPublicacao}
                        />
                    }
                })
            }
        </>
    )
}
