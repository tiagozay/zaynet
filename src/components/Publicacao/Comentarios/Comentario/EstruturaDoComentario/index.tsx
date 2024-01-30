import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import InputComentario from '../../InputComentario';
import './EstruturaDoComentario.css';
import UsuarioService from '../../../../../services/UsuarioService';
import { ComentarioPublicacao } from '../../../../../models/Publicacao/ComentarioPublicacao';
import ModalDeConfirmacao from '../../../../ModalDeConfirmacao';
import { APIService } from '../../../../../services/APIService';
import { ComentarioResposta } from '../../../../../models/Publicacao/ComentarioResposta';

interface EstruturaDoComentarioProps {
    comentario: ComentarioPublicacao | ComentarioResposta;
    ehUmaResposta: boolean;
    clickResponderComentario?: () => void,
    atualizaComentarios: () => void
}

export default function EstruturaDoComentario({
    comentario,
    ehUmaResposta,
    clickResponderComentario,
    atualizaComentarios
}: EstruturaDoComentarioProps) {
    const [usuarioJaCurtiuOComentario, setUsuarioJaCurtiuOComentario] = useState(false);
    const [indicadorEdicao, setIndicadorEdicao] = useState(false);

    const [modalConfirmacaoExcluirComentarioAberto, setModalConfirmacaoExcluirComentarioAberto] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [novoComentarioDigitado, setNovoComentarioDigitado] = useState("");

    const idUsuarioLogado = UsuarioService.obtemIdUsuarioLogado();

    const idComentario = comentario.id;
    const perfilUsuario = `${process.env.REACT_APP_CAMINHO_IMAGEM_PERFIL_MINIATURA}${comentario.autor.nomeMiniaturaFotoPerfil}`;
    const idAutor = comentario.autor.id;
    const idAutorPublicacao = comentario.idAutorPublicacao;
    const nomeUsuario = `${comentario.autor.nome} ${comentario.autor.sobrenome}`;
    const conteudo = comentario.texto;
    const [quantidadeDeCurtidas, setQuantidadeDeCurtidas] = useState(
        comentario.curtidas ? comentario.curtidas.length : 0
    );

    useEffect(() => {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                fecharEdicao();
            }
        })
    }, []);

    useEffect(() => {
        if (modalConfirmacaoExcluirComentarioAberto) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [modalConfirmacaoExcluirComentarioAberto]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [indicadorEdicao]);

    useEffect(() => {
        const usuarioLogadoJaCurtiu = comentario.curtidas?.some(curtida => {
            return curtida.autor.id === idUsuarioLogado
        });

        setUsuarioJaCurtiuOComentario(usuarioLogadoJaCurtiu ? true : false);

    }, []);

    function clickEmEditar() {
        setIndicadorEdicao(true);
    }

    function fecharEdicao() {
        setIndicadorEdicao(false);
    }

    function clickExcluirComentario() {
        setModalConfirmacaoExcluirComentarioAberto(true);
    }

    function excluirComentario() {
        APIService.delete(`comentarios/${idComentario}`)
            .then(res => {
                setModalConfirmacaoExcluirComentarioAberto(false);
                atualizaComentarios();
            });
    }

    function clickEmCurtir() {

        //Antes de enviar a curtida para o servidor, dispara os alterações no front-end
        if (usuarioJaCurtiuOComentario) {
            setQuantidadeDeCurtidas(quantidadeDeCurtidas - 1);
        } else {
            setQuantidadeDeCurtidas(quantidadeDeCurtidas + 1);
        }
        setUsuarioJaCurtiuOComentario(!usuarioJaCurtiuOComentario);

        APIService.post(`comentarios/${idComentario}/curtir`, {})
            .catch(() => { });

    }

    return (
        <>

            {
                modalConfirmacaoExcluirComentarioAberto ?
                    <ModalDeConfirmacao
                        titulo='Excluir comentário'
                        mensagem='Deseja mesmo excluír este comentário?'
                        modalAberto={modalConfirmacaoExcluirComentarioAberto}
                        fecharModal={() => setModalConfirmacaoExcluirComentarioAberto(false)}
                        aoConfirmar={excluirComentario}
                    /> : ""
            }
            <div id='comentario__container'>
                <img src={perfilUsuario} alt="Perfil usuário" className='comentario__perfil' />
                <div className='areaComentarios__comentario__conteudo'>
                    {
                        indicadorEdicao ?
                            <div id='comentario__divInputEditarComentario'>
                                <InputComentario
                                    ref={inputRef}
                                    novoComentarioDigitado={novoComentarioDigitado}
                                    setNovoComentarioDigitado={setNovoComentarioDigitado}
                                    clickEnviarComentario={() => { }}
                                />
                                <p id="editarComentario__textoCancelar">
                                    Pressione Esc para
                                    <button onClick={fecharEdicao}>cancelar</button>
                                </p>
                            </div> :
                            <>
                                <div className='comenario__nomeEComentario'>
                                    <span className='comentario__nome'>{nomeUsuario}</span>
                                    <p className='comentario__conteudo'>{conteudo}</p>
                                </div>

                                <div className='comentario__opcoes'>
                                    <button className={`
                            comentario__opcao 
                            ${usuarioJaCurtiuOComentario && 'btnDeCurtirJaPrecionado'}
                        `}
                                        id='comentario__opcaoLike'
                                        onClick={clickEmCurtir}
                                    >
                                        Curtir
                                        (<span id='comentario__opcaoLike__quantidade'>{quantidadeDeCurtidas}</span>)
                                    </button>

                                    {
                                        !ehUmaResposta ?
                                            <button className='comentario__opcao' onClick={clickResponderComentario}>
                                                Responder
                                            </button> :
                                            ""
                                    }


                                    {
                                        idAutor === idUsuarioLogado ?
                                            <button className='comentario__opcao' onClick={clickEmEditar}>Editar</button> : ""
                                    }

                                    {
                                        //Só exibe o botão de excluir comentário se for o autor do comentario ou o autor da publicação
                                        idAutor === idUsuarioLogado || idAutorPublicacao === idUsuarioLogado ?

                                            <button className='comentario__opcao' id='comentario__opcaoExcluir' onClick={clickExcluirComentario}>Excluir</button> : ""
                                    }
                                </div>
                            </>
                    }
                </div>
            </div>
        </>

    )
}
